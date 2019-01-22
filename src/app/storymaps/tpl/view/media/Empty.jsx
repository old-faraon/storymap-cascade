import Media from './Media';

import i18n from 'lib-build/i18n!resources/tpl/builder/nls/app';

import {} from 'lib-build/less!./Empty';
import viewTpl from 'lib-build/hbars!./Empty';

const PREVIEW_THUMB = app.pathCascade + 'resources/tpl/builder/icons/media-placeholder/image.jpg';
const PREVIEW_ICON = app.pathCascade + 'resources/tpl/builder/icons/immersive-panel/image.png';

export default class Empty extends Media {

  constructor() {
    super({
      type: 'empty',
      id: null,
      previewThumb: PREVIEW_THUMB,
      previewIcon: PREVIEW_ICON
    });

    this._placement = null;
    this._onEdit = null;
  }

  render(context) {

    if (! context) {
      console.log('Could not render webmap in section');
      return '';
    }

    this._placement = context.placement;

    if (this._placement == 'block') {
      return '';
    }
    else {
      return viewTpl({
        id: this._domID,
        label: i18n.builder.immersiveViewPanel.addMedia
      });
    }

  }

  load() {
    //
  }

  postCreate(params = {}) {
    super.postCreate(params);

    if (! params.container) {
      return;
    }

    this._node = params.container.find('#' + this._domID).parent();

    this._node.find('.me-placeholder').css('backgroundImage', 'url(' + app.pathCascade + '"resources/tpl/builder/icons/immersive/background-placeholder.jpg")');
    this._node.find('.media-empty-add')
      .addClass('authorized-' + (params.mediaIcon || 'all'))
      .click(this.onPickMedia.bind(this));
  }

  resize() {
    //
  }

  getNode() {
    return this._node;
  }

  performAction() {
    //
  }

  //
  // Builder
  //

  serialize() {
    // we don't ever want the instanceID put on
    return super.serialize('empty', 'empty', false);
  }

  onPickMedia() {
    this._onAction('swap');
  }
}
