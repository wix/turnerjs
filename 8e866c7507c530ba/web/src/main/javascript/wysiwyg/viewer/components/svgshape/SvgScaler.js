/**
 * User: eitanr@wix.com
 * Date: 12/06/13
 * Time: 14:19
 */
define.Class('wysiwyg.viewer.components.svgshape.SvgScaler', function (classDefinition) {
    /**@type wysiwyg.viewer.components.svgshape.SvgScaler */
    var def = classDefinition;

    def.utilize([
        'wysiwyg.viewer.components.svgshape.SvgPathScaler',
        'wysiwyg.viewer.components.svgshape.SvgPolygonScaler',
        'wysiwyg.viewer.components.svgshape.SvgRectScaler',
        'wysiwyg.viewer.components.svgshape.SvgCircleScaler',
        'wysiwyg.viewer.components.svgshape.SvgEllipseScaler',
        'wysiwyg.viewer.components.svgshape.SvgPolylineScaler',
        'wysiwyg.viewer.components.svgshape.SvgLineScaler']);

    def.methods({

        initialize: function (svgDomElement) {
            this.svgElement = svgDomElement;
            this._setGroupElement();
            this._initializeScalers();
        },
        _setGroupElement: function () {
            // If "svgElement" doesn't exist (probably the retrieval from the statics failed) log an error and return - this way the editor will load.
            // (Instead of the "throw" which wasn't being handled properly and meant the Editor didn't load)
            if (!this.svgElement) {
                LOG.reportError(wixErrors.SHAPE_NOT_LOADED_IN_EDITOR, 'wysiwyg.viewer.components.svgshape.SvgScaler', '_setGroupElement', 'Probably happened here: SkinManager.AutoGeneratedShapesSkins');
                return;
            }
            this.groupElement = _(this.svgElement.childNodes).find(function (child) {
                return child.nodeName === 'g';
            });
        },
        _initializeScalers: function () {
            if (!this.groupElement) {
                // Something's wrong - probably the shape couldn't be retrieved, an error should have been reported for this in "_setGroupElement"
                return;
            }
            this.scalers = [];
            _(this.groupElement.childNodes).forEach(function (elem) {
                if (this._isValidSvgElement(elem.nodeName)) {
                    this.scalers.push(this._createScaler(elem));
                }
            }.bind(this));
        },
        _isValidSvgElement: function (elementName) {
            return _(['path', 'polygon', 'rect', 'circle', 'ellipse', 'polyline', 'line']).contains(elementName.toLowerCase());
        },
        _createScaler: function (node) {

            var name = node.nodeName.toLowerCase();
            switch (name) {
                case 'path' :
                    return new this.imports.SvgPathScaler(node);
                case 'polygon':
                    return new this.imports.SvgPolygonScaler(node);
                case 'rect':
                    return new this.imports.SvgRectScaler(node);
                case 'circle':
                    return new this.imports.SvgCircleScaler(node);
                case 'ellipse':
                    return new this.imports.SvgEllipseScaler(node);
                case 'polyline':
                    return new this.imports.SvgPolylineScaler(node);
                case 'line':
                    return new this.imports.SvgLineScaler(node);
                default:
                    throw new Error('Can\'t create a scaler for "' + name + '" element, because it is not implemented.');
            }
        },
        getActualDimensions: function () {
            var box;
            try {
                box = this.groupElement.getBBox();
            }
            catch (e) {
                box = {
                    width: 0,
                    height: 0,
                    x: 0,
                    y: 0
                };
            }
            return {
                width: Math.round(box.width),
                height: Math.round(box.height),
                x: Math.round(box.x),
                y: Math.round(box.y)
            };
        },
        translateShapePosition: function (stroke) {
            var box = this.getActualDimensions();
            this.groupElement.setAttribute('transform', 'translate(' + parseFloat((-1 * box.x) + stroke * 0.5) + ',' + parseFloat((-1 * box.y) + stroke * 0.5) + ')');
        },
        scale: function (scaleX, scaleY) {
            this.scalers.forEach(function (scaler) {
                scaler.scale(scaleX, scaleY);
            });
        },
        setAspectRatio: function (dimensions) {
            if (dimensions.height && dimensions.width) {
                this.aspectRatio = dimensions.width / dimensions.height;
            }
        },
        getOriginalAspectRatio: function () {
            return this.aspectRatio;
        }
    });
});







