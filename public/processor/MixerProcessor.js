export class MixerProcessor extends AudioWorkletProcessor {
  constructor() {
    super();
  }

  process(inputList, outputList, _parameters) {
    const sourceLimit = Math.min(inputList.length, outputList.length)

    for (let inputNum = 0; inputNum < sourceLimit; inputNum++) {
      const input = inputList[inputNum];
      const output = outputList[0];
      const channelCount = Math.min(input.length, output.length);

      for (let channelNum = 0; channelNum < channelCount; channelNum++) {
        for (let i = 0; i < input[channelNum].length; i++) {
          let sample = output[channelNum][i] + input[channelNum][i];

          if (sample > 1.0) {
            sample = 1.0;
          } else if (sample < -1.0) {
            sample = -1.0;
          }

          output[channelNum][i] = sample;
        }
      }
    }

    return true;
  }
}

registerProcessor('mixer-processor', MixerProcessor);
