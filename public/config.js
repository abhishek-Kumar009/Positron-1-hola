CKEDITOR.editorConfig = function( config ) {
	config.toolbarGroups = [
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
		{ name: 'links', groups: [ 'links' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		'/',
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }/*,
		{ name: 'wiris', groups : [ 'ckeditor_wiris_formulaEditor','ckeditor_wiris_formulaEditorChemistry']}*/
	];
	//config.extraPlugins = 'filebrowser';//,ckeditor_wiris';
	config.removeButtons = 'Templates,Source,Save,SelectAll,Form,CopyFormatting,Subscript,Superscript,Blockquote,BidiLtr,Flash,HorizontalRule,SpecialChar,PageBreak,Iframe,Styles,TextColor,Maximize,About,Cut,Find,Scayt,Anchor,Copy,Paste,PasteText,PasteFromWord';
	config.allowedContent = true;
};

