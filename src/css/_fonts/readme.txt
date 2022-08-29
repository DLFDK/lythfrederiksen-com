Reduce number of axes in a variable font:
fonttools varLib.instancer ./roboto.ttf wght=300:800 wdth=drop opsz=drop GRAD=drop slnt=drop XTRA=drop XOPQ=drop YOPQ=drop YTLC=drop YTUC=drop YTAS=drop YTDE=drop YTFI=drop

Subset:
pyftsubset "INPUT.ttf" --output-file="FILENAME.woff2" --flavor=woff2 --layout-features="*" --no-hinting --desubroutinize --unicodes=...

Get used characters at URL:
npx glyphhanger http://localhost:8080/
or
npx glyphhanger ./readme.txt

Whitelist
½§1234567890+´´``!"#¤%&/()=?@££$€{[]}|~^*'qw€rtyuiopåasdfghjklæø<\<\>,;.:_-+-,*/QWERTYUIOPÅASDFGHJKLÆØZXCVBNM""“”’é°é©–