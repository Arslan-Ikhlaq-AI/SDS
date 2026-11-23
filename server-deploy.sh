#!/bin/bash
#
# Runs ON THE SERVER (cPanel account "sdsreale"). A cron job calls it every
# 2 minutes. It does nothing unless GitHub has new commits on main, so it is
# safe to run as often as you like.
#
#   Normal run (cron):   bash ~/sds/server-deploy.sh
#   Force a full deploy: bash ~/sds/server-deploy.sh --force
#
# Everything is wrapped in main() so bash reads the whole script before
# running it; `git reset` may replace this file while it runs.

main() {
    set -euo pipefail

    local app_dir="$HOME/sds"
    local branch="main"
    local php="/opt/alt/php83/usr/bin/php"
    local composer="$HOME/bin/composer.phar"
    local lock_file="$HOME/.sds-deploy.lock"

    export HOME
    export PATH="/opt/alt/php83/usr/bin:/usr/local/bin:/usr/bin:/bin"
    export COMPOSER_HOME="$HOME/.composer"

    cd "$app_dir"

    # Never run two deploys at the same time.
    exec 9>"$lock_file"
    flock -n 9 || exit 0

    git fetch --quiet origin "$branch"

    local current_commit
    local latest_commit
    current_commit="$(git rev-parse HEAD)"
    latest_commit="$(git rev-parse "origin/$branch")"

    if [[ "$current_commit" == "$latest_commit" && "${1:-}" != "--force" ]]; then
        exit 0
    fi

    echo "=== $(date '+%Y-%m-%d %H:%M:%S') deploying ${latest_commit:0:7}: $(git log -1 --format=%s "origin/$branch")"

    git reset --hard "origin/$branch"

    # The host has no Composer, so install it once with the official,
    # checksum-verified installer.
    if [[ ! -f "$composer" ]]; then
        mkdir -p "$HOME/bin"
        curl -fsSL -o "$HOME/bin/composer-setup.php" https://getcomposer.org/installer
        local expected_hash
        expected_hash="$(curl -fsSL https://composer.github.io/installer.sig)"
        if [[ "$("$php" -r "echo hash_file('sha384', '$HOME/bin/composer-setup.php');")" != "$expected_hash" ]]; then
            echo "Composer installer checksum mismatch"
            rm -f "$HOME/bin/composer-setup.php"
            exit 1
        fi
        "$php" "$HOME/bin/composer-setup.php" --quiet --install-dir="$HOME/bin" --filename=composer.phar
        rm -f "$HOME/bin/composer-setup.php"
    fi

    "$php" "$composer" install --no-dev --no-interaction --prefer-dist --optimize-autoloader --no-progress

    touch database/database.sqlite
    "$php" artisan migrate --force
    "$php" artisan optimize:clear
    "$php" artisan optimize

    echo "=== done"
}

main "$@"
exit
