$.get('README.md').then(markdown => {
	var html = marked(markdown)

	$('<div>').css({
		width:        750,
		height:      '100%',
		padding:      10,
		overflowY:   'auto',
		marginLeft:  'auto',
		marginRight: 'auto'
	}).append(html).appendTo($('body'))
})