Reduce number of axes in a variable font:
fonttools varLib.instancer ./INPUT.ttf wght=300:800 wdth=drop opsz=drop GRAD=drop slnt=drop XTRA=drop XOPQ=drop YOPQ=drop YTLC=drop YTUC=drop YTAS=drop YTDE=drop YTFI=drop

Subset:
pyftsubset "INPUT.ttf" --output-file="FILENAME.woff2" --flavor=woff2 --layout-features="*" --no-hinting --desubroutinize --unicodes=...

Get used characters at URL:
npx glyphhanger http://localhost:8080/