import getDevTools from './getDevTools';
import renderer from 'react-test-renderer';

describe('Console', () => {
  describe('output', () => {
    let devTool;

    beforeEach(() => {
      devTool = getDevTools();
    });
    
    it('should render an emptry list', () => {
      expect(devTool.console.output().props.logs).toEqual([
      ]);
    });
    
    it('should render one item', () => {
      renderer.act(() => {
        devTool.log.add('test');
      });
      expect(devTool.console.output().props.logs).toEqual([
        'test',
      ]);
    });
    
    it('should render multible items item', () => {
      renderer.act(() => {
        devTool.log.add('1');
        devTool.log.add('2');
        devTool.log.add('3');
        devTool.log.add('4');
        devTool.log.add('5');
        devTool.log.add('6');
        devTool.log.add('7');
      });
      expect(devTool.console.output().props.logs).toEqual([
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
      ]);
    });
  });
})