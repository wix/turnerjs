define.skin('mock.viewer.skins.PageDeadCompsHandlerCompSkin', function(skinDefinition){
    /** @type core.managers.skin.SkinDefinition*/
    var def = skinDefinition;

    def.inherits('core.managers.skin.BaseSkin2');

    def.html('<div skinPart="title" class="deadCompError"></div>' +
    '<div skinPart="desc" class="deadCompError"></div>' +
    '<div skinPart="desc2" class="deadCompError"></div>');

    def.css([
        ' {background: red}'
    ]);
});