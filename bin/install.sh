#!/usr/bin/env bash

echo -n "API Client required lates Node.JS, Do you want to install latest Node.JS with NVM? [Y/n]:"
read installNVMFlag

if [ -z "${installNVMFlag}" ] || [ "${installNVMFlag}" == "" ] || [ "Y" == "${installNVMFlag}" ] || [ "y" == "${installNVMFlag}" ]; then
	echo -e "\n\n========================================================================"
	echo "Installing NVM ...."
	curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.29.0/install.sh | bash

	echo -e "\n\n========================================================================"
	echo "Installing Latest Stable Node.JS version..."
	nvm install stable
fi

echo -ne "\n\nDo you want to install API Client? [Y/n]"
read installAPIClientFlag
if [ -z "${installAPIClientFlag}" ] || [ "${installAPIClientFlag}" == "" ] || [ "Y" == "${installAPIClientFlag}" ] || [ "y" == "${installAPIClientFlag}" ]; then
	echo -e "\n\n========================================================================"
	echo "Installing API Client ...."
	npm i -g https://github.com/AmitThakkar/Api-Client.git
fi

echo -e "\n\n========================================================================"
echo "Clonning AmitThakkar/Test App..."
git clone https://github.com/AmitThakkar/test.git

echo -e "\n\n\n\nTo run AmitThakkar/Test App run following commands:"
echo "cd test"
echo "ac"

echo "You all done. Thanks for Using API Server/Client!"