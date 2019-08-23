#!/bin/sh

if [[ -z ${DEPLOY_ENV} ]]; then
  ENV_DEPLOY="cloud"
else
  ENV_DEPLOY="${DEPLOY_ENV}"
fi

if [[ $ENV_DEPLOY = "gitlab-ci" ]]; then
  echo "set \$gateway http://${PUBLIC_GATEWAY_HOST}:${PUBLIC_GATEWAY_PORT};" > /etc/nginx/envvars.conf
else
  echo "set \$gateway http://${PUBLIC_GATEWAY_HOST}.${NAMESPACE}.svc.cluster.local:${PUBLIC_GATEWAY_PORT};" > /etc/nginx/envvars.conf
fi

echo "set \$journeyUI ${JM_JOURNEY_UI};" >> /etc/nginx/envvars.conf
sed -i -e 's#PUBLIC_GATEWAY_URL#'"${PUBLIC_GATEWAY_URL}"'#g' /usr/share/nginx/html/assets/config/config.prod.json
sed -i -e 's#DEFAULT_TENANT_DNS_NAME#'"${CJM_DEFAULT_TENANT_NAME}"'#g' /usr/share/nginx/html/assets/config/config.prod.json
sed -i -e 's#APP_PROFILE#'"${CJM_APP_PROFILE}"'#g' /usr/share/nginx/html/assets/config/config.prod.json
sed -i -e 's#CJM_LOGO_URL#'"${CJM_LOGO_URL}"'#g' /usr/share/nginx/html/assets/config/config.prod.json
sed -i -e 's#CJM_FAV_ICON_URL#'"${CJM_FAV_ICON_URL:-assets/themes/base/images/icons/favicon.ico}"'#g' /usr/share/nginx/html/index.html
sed -i -e 's#LOCALIZATION_MICROSERVICE_NAMES#'"${LOCALIZATION_MICROSERVICE_NAMES}"'#g' /usr/share/nginx/html/assets/config/config.prod.json
sed -i -e 's#MICROSERVICE_NAME#'"${MICROSERVICE_NAME}"'#g' /usr/share/nginx/html/assets/config/config.prod.json
