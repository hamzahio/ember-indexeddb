import Ember from 'ember';
import ModelBulkSaveMixin from 'ember-indexeddb/mixins/model-bulk-save';
import { module, test } from 'qunit';

const {
  Object: EmberObject
} = Ember;

module('Unit | Mixin | model bulk save');

// Replace this with your real tests.
test('it works', function(assert) {
  let ModelBulkSaveObject = EmberObject.extend(ModelBulkSaveMixin);
  let subject = ModelBulkSaveObject.create();
  assert.ok(subject);
});
