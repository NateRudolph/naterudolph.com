#!/bin/sh
#
# Bash script to run Hugo server and gulp watch tasks
#

hugo serve -D --disableFastRender & cd themes/v1/ && npm start