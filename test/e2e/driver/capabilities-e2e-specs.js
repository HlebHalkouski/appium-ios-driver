// transpile:mocha

import _ from 'lodash';
import env from '../helpers/env';
import { IosDriver } from '../../../lib/driver';
import { rootDir } from '../../../lib/utils';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import path from 'path';

chai.should();
chai.use(chaiAsPromised);

describe('capabilities', function () {
  this.timeout(120000);
  let driver;

  after(async () => {
    await driver.deleteSession();
  });

  it('should contain server details', async () => {
    let caps = {
      app: path.resolve(rootDir, 'test', 'assets', 'TestApp.zip'),
      platformName: 'iOS'
    };
    caps = _.merge({}, env.CAPS, caps);
    driver = new IosDriver();
    await driver.createSession(caps);
    let serverCaps = await driver.getSession();
    serverCaps.takesScreenshot.should.exist;
  });
});
