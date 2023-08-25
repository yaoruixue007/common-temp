rm TS*.zip
rm -rf ui

d=`date +"%Y%m%d"`
npm run build
mv dist ui
zip -r TSAlgorithmapp$d.zip server ui