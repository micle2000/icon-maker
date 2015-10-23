# [Icon Maker](http://micle2000.github.io/icon-maker/)

make 16x16 icons for use in data urls

suggested style for icon:
```css
div.icon {
	display: inline-block;
	vertical-align: top;
	width: 16px;
	height: 16px;
}

div.icon.icon-name {
	background-image: url(/* data */);
}
```

can be used as a favicon too
```html
<link rel="icon" type="image/png" href="/* data */"/>

