svgFolderPathArray=(./assets/svg ./assets/svg/service-icons ./assets/svg/payment-history ./assets/svg/landing3 ./assets/svg/404 ./assets/sprite/svg ./static/img ./static/img/cp/income ./static/img/cp/payment ./static/img/cp/profile/invite ./static/favicons ./static/img)
for n in ${!svgFolderPathArray[@]}; do \
	./node_modules/svgo/bin/svgo -f ${svgFolderPathArray[$n]};
	done
$SHELL
