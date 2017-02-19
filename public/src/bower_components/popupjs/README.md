# PopupJS

JS module to create modal / popup windows

## Install
`bower install --save popupjs`

Include this to your HTML
```
<script src="bower_components/popupjs/dist/popup.min.js"></script>
<link rel="stylesheet" href="bower_components/popupjs/dist/popup.min.css">
```

## Usage
```
$.popupjs.init({
  pos: {
    x: 0,
    y: 0
  },
  width: '50%',
  height: '100%',
  title: 'Popup',
  html: '<p>My popup</p>',
  closeBut: true
})
$.popupjs.draw()
```
