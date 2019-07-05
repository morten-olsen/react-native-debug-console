import React from 'react';
import renderer from 'react-test-renderer';
import {
  DevTool,
} from '../src';
import Console from '../src/components/DevTool/Console';
import ConsoleOutput, { Row as OutputRow} from '../src/components/DevTool/Console/Output';
import ConsoleInput from '../src/components/DevTool/Console/Input';

import Requests from '../src/components/DevTool/Requests';
import RequestsDetails from '../src/components/DevTool/Requests/Details';
import RequestsList from '../src/components/DevTool/Requests/List';

import Storage from '../src/components/DevTool/Storage';
import StorageKeys from '../src/components/DevTool/Storage/Keys';
import StorageValues from '../src/components/DevTool/Storage/Value';

const createLog = () => {
  const listeners = [];
  const logs = [];
  return {
    listen: (l) => listeners.push(l),
    unlisten: (l) => listeners = listeners.filter(nl => nl !== l),
    add: (log) => {
      logs.push(log);
      listeners.forEach(l => l(logs));
    }
  }
}

const getDevTools = () => {
  const log = createLog();
  const instance = renderer.create(
    <DevTool
      logProvider={log}
    />
  );
  const result = {
    instance,
    console: {
      main: () => instance.root.findByType(Console),
      output: () => instance.root.findByType(ConsoleOutput),
      rows: () => instance.root.findAllByType(OutputRow),
      input: () => instance.root.findByType(ConsoleInput),
    },
    requests: {
      main: () => instance.root.findByType(Requests),
      output: () => instance.root.findByType(RequestsDetails),
      input: () => instance.root.findByType(RequestsList),
    },
    storage: {
      main: () => instance.root.findByType(Storage),
      output: () => instance.root.findByType(StorageKeys),
      input: () => instance.root.findByType(StorageValues),
    },
    log,
  };
  return result;
};

export default getDevTools;