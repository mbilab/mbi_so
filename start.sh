#!/bin/sh -x
npm=/usr/local/bin/npm
tmux=/usr/local/bin/tmux

cmd1="$npm run start-webpack"
cmd2=". ~/.virtualenvs/mbi_so/bin/activate; $npm run start-django"

# comment/un-comment `\; last-window` to control the window after servers start
#     comment: stay in the servers window
#  un-comment: back to the window you run this script
$tmux new-window -c '#{pane_current_path}' -n servers "$cmd1" \; split-window -h "$cmd2" # \; last-window
