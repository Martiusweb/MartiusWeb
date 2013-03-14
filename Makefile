BOOTSTRAP_PATH = vendor/bootstrap
BOOTSTRAP = ./css/styles.css
BOOTSTRAP_LESS = ./less/styles.less
BOOTSTRAP_RESPONSIVE = ./css/styles-responsive.css
BOOTSTRAP_RESPONSIVE_LESS = ./less/responsive.less

bootstrap:
	mkdir -p ./css ./js ./img
	./${BOOTSTRAP_PATH}/node_modules/.bin/jshint ${BOOTSTRAP_PATH}/js/*.js --config ${BOOTSTRAP_PATH}/js/.jshintrc
	./${BOOTSTRAP_PATH}/node_modules/.bin/jshint ${BOOTSTRAP_PATH}/js/tests/unit/*.js --config ${BOOTSTRAP_PATH}/js/.jshintrc
	./${BOOTSTRAP_PATH}/node_modules/.bin/recess --compile ${BOOTSTRAP_LESS} > ${BOOTSTRAP}
	./${BOOTSTRAP_PATH}/node_modules/.bin/recess --compile ${BOOTSTRAP_RESPONSIVE_LESS} > ${BOOTSTRAP_RESPONSIVE}
	cp ${BOOTSTRAP_PATH}/img/* img/
	cp ${BOOTSTRAP_PATH}/js/*.js js/
	cp ${BOOTSTRAP_PATH}/js/tests/vendor/jquery.js js/
	cat \
		${BOOTSTRAP_PATH}/js/bootstrap-transition.js \
		${BOOTSTRAP_PATH}/js/bootstrap-alert.js \
		${BOOTSTRAP_PATH}/js/bootstrap-button.js \
		${BOOTSTRAP_PATH}/js/bootstrap-carousel.js \
		${BOOTSTRAP_PATH}/js/bootstrap-collapse.js \
		${BOOTSTRAP_PATH}/js/bootstrap-dropdown.js \
		${BOOTSTRAP_PATH}/js/bootstrap-modal.js \
		${BOOTSTRAP_PATH}/js/bootstrap-tooltip.js \
		${BOOTSTRAP_PATH}/js/bootstrap-popover.js \
		${BOOTSTRAP_PATH}/js/bootstrap-scrollspy.js \
		${BOOTSTRAP_PATH}/js/bootstrap-tab.js \
		${BOOTSTRAP_PATH}/js/bootstrap-typeahead.js \
		${BOOTSTRAP_PATH}/js/bootstrap-affix.js \
		> js/bootstrap.js
	./${BOOTSTRAP_PATH}/node_modules/.bin/uglifyjs -nc js/bootstrap.js > js/bootstrap.min.js

watch:
	echo "Watching less files..."; \
	watchr -e "watch('less/.*\.less') { system 'make bootstrap' }"
