YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "IndexedDb",
        "IndexedDbAdapter",
        "IndexedDbConfiguration",
        "IndexedDbSerializer",
        "ModelBulkSave"
    ],
    "modules": [
        "Configuring your database",
        "Ember Data",
        "Querying & Inserting data",
        "Services",
        "Setup",
        "Usage"
    ],
    "allModules": [
        {
            "displayName": "Configuring your database",
            "name": "Configuring your database",
            "description": "## Configuring your database\n\nYou need to extend the indexed-db-configuration service:\n\n```js\nimport IndexedDbConfigurationService from 'ember-indexeddb/services/indexed-db-configuration';\n\nexport default IndexedDbConfigurationService.extend({\n currentVersion: 1,\n\n version1: {\n   stores: {\n     'model-one': '&id,*isNew',\n     'model-two': '&id,*status,*modelOne,[status+modelOne]'\n   }\n }\n});\n```\n\nPlease consult the Dexie Documentation on [details about configuring your database](https://github.com/dfahlander/Dexie.js/wiki/Version.stores()).\nBasically, you should always have an `&id` column as a primary index, and add further indices that you want to query by. You can also add multi-indices for more complex querying.\n\nEach version can also have an upgrade function in addition (or instead of) a stores property. This can be used to do data migrations. See the Dexie Documentation for details about [data migrations and upgrades](https://github.com/dfahlander/Dexie.js/wiki/Version.upgrade()).\n\nYou can add as many version as you want, and Dexie will handle the upgrading for you. Note that you cannot downgrade a version. There needs to be a `versionX` property per version, starting at 1. So if you have a `currentVersion` of 3, you need to have `version1`, `version2` and `version3` properties.\n\nAll of these migrations are automatically run when running `this.get('indexedDb').setup();`.\n\nIn addition to the store configuration, you also need to define a `mapTable`.\nThis is a map of functions which is used to normalize JSONAPI payloads for IndexedDB.\n\nFor the above example, this should look something like this:\n\n```js\nmapTable: computed(function() {\n return {\n   'model-one': (item) => {\n     return {\n       id: this._toString(get(item, 'id')),\n       json: this._cleanupObject(item),\n       isNew: this._toZeroOne(get(item, 'isNew'))\n     };\n   },\n   'model-two': (item) => {\n     return {\n       id: this._toString(get(item, 'id')),\n       json: this._cleanupObject(item),\n       modelOne: this._toString(get(item, 'relationships.modelOne.data.id')),\n       status: get(item, 'attributes.status')\n     };\n   }\n };\n})\n```\n\nThings to note here:\n\n1. Always convert your IDs to strings. You can use the provided `this._toString(val)` function for this.\n2. Always clean up your json. You can use the provided `this._cleanObject(item)` for this, which will clean up prototype & meta properties/functions.\n3. IndexedDB doesn't work with boolean queries. You need to convert booleans to 1/0 when inserting it into the Database. You can use the provided `this._toZeroOne(val)` for this.\n\nYou should have one property per item you want to query for. The item which is passed in is a JSONAPI payload-item."
        },
        {
            "displayName": "Ember Data",
            "name": "Ember Data",
            "description": "## Usage with Ember Data\n\nThe real power of this utility comes together with the provided ember-data adapter. Just extend from it instead of from the default adapter:\n\n```js\nimport IndexedDbAdapter from 'ember-indexeddb/adapters/indexed-db';\n\nexport default IndexedDbAdapter.extend();\n```\n\nNow, you can simply use the normal ember-data store with functions like `store.query('item', { isNew: true })`.\nNote that it will also persist data to IndexedDB when calling e.g. `createRecord()` or `save()`.\nIf you want to persist data back to an API, you need to handle this yourself.\nThis works with the default JSONAPISerializer.\n\nNote that `query` and `queryRecord` will try to do actual querying on the database layer. This will, of course, only work if the indices have been setup correctly. If you try to query by something for which no query exists, it will fall back to filtering via JS (which works, but is _much_ slower)."
        },
        {
            "displayName": "Querying & Inserting data",
            "name": "Querying & Inserting data",
            "description": "## Querying & Inserting data\n\nYou can now work with IndexedDB!\nFor example, let's image you query some items from a server:\n\n```js\nlet indexedDB = this.get('indexedDb');\nlet ajax = this.get('ajax')\n\najax.request('/items').then((items) => {\n indexedDB.add('item', items);\n});\n\n// Later, fetch them again\nindexedDb.findAll('item').then((items) => {\n // Here are the JSONAPI-payloads again!\n});\n```\n\nIf you do not use JSONAPI, you should convert it to the JSONAPI format before calling `indexedDB.add('item', items);`."
        },
        {
            "displayName": "Services",
            "name": "Services",
            "description": "Available services to use.\n Overwrite IndexedDbConfiguration to fit your application."
        },
        {
            "displayName": "Setup",
            "name": "Setup",
            "description": "## Setup\n\nAfter installing the addon, you'll need to setup the database on application start.\nFor this, you should add the following to your application/route.js:\n\n```js\n// application/route.js or routes/application.js\nimport Ember from 'ember';\n\nexport default Ember.Route.extend({\n indexedDb: Ember.inject.service(),\n\n beforeModel() {\n   this._super(...arguments);\n\n   return this.get('indexedDb').setup();\n }\n});\n```\n\nThis returns a promise that is ready once the database is setup. Note that this will reject if IndexedDB is not available - you need to handle this case accordingly.\n\nNow, you just need to define your database tables by extending the indexed-db-configuration service."
        },
        {
            "displayName": "Usage",
            "name": "Usage",
            "description": "## Installation\n```shell\nember install ember-indexeddb\n```\n\n## Changelog\nChangelog can be found [here](https://github.com/mydea/ember-indexeddb/blob/master/CHANGELOG.md)\n\n\n## Looking for help?\nIf it is a bug [please open an issue on GitHub](http://github.com/mydea/ember-indexeddb/issues)."
        }
    ],
    "elements": []
} };
});