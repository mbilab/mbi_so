#!/bin/sh -x
npm=/usr/local/bin/npm
tmux=/usr/local/bin/tmux

cmd1="$npm run webpack"
cmd2=". ~/.virtualenvs/mbi_so/bin/activate; $npm run django"

$tmux new-window -c '#{pane_current_path}' -n server "$cmd1" \; split-window -h "$cmd2"
