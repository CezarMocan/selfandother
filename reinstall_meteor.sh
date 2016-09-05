#!/bin/sh
mv .meteor/ ../
sudo rm /usr/local/bin/meteor
curl https://install.meteor.com | sh
mv ../.meteor/ .
meteor update
meteor update --all-packages