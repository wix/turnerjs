define.skin('mock.viewer.skins.line.VerticalSolidLine',
    function(skinDefinition, experimentStrategy){
        /**@type core.managers.skin.SkinDefinition */
        var def = skinDefinition;

        def.inherits('core.managers.skin.BaseSkin2');

        def.html('<div skinPart="line"></div>');
    }
);