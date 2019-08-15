module.exports = {
  name: 'shared-util-test',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/shared/util/test',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
