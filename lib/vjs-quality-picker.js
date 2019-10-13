import videojs from 'video.js';
import QualityPickerButton from './quality-picker-button';

function qualityPickerPlugin(options) {
  let player = this;

  let SUPPORTED_TRACKS = ["video", "audio", "subtitle"];
  let TRACK_CLASS = {
    video: 'vjs-icon-hd',
    audio: 'vjs-icon-cog',
    subtitle: 'vjs-icon-subtitles'
  };

  function toTitleCase(string) {
    if (typeof string !== 'string') {
      return string;
    }

    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function onQualityData(event, {qualityData, qualitySwitchCallback}) {
    var fullscreenToggle = player.controlBar.getChild('fullscreenToggle');
    player.controlBar.removeChild(fullscreenToggle);

    for (var i = 0; i < SUPPORTED_TRACKS.length; i++) {
      var track = SUPPORTED_TRACKS[i];
      var name = toTitleCase(track + "PickerButton");
      var qualityPickerButton = player.controlBar.getChild(name);
      if (qualityPickerButton) {
        qualityPickerButton.dispose();
        player.controlBar.removeChild(qualityPickerButton);
      }

      if (qualityData[track] && qualityData[track].length > 1) {
        qualityPickerButton = new QualityPickerButton(player, {
          name,
          qualitySwitchCallback,
          qualityList: qualityData[track],
          trackType: track
        });

        // set icon class on placeholder
        var icon = qualityPickerButton.$$(".vjs-icon-placeholder");
        icon[0].classList.add(TRACK_CLASS[track]);

        player.controlBar.addChild(qualityPickerButton);
      }
    }

    if (fullscreenToggle) {
      player.controlBar.addChild(fullscreenToggle);
    }
  }

  function init() {
    const tech = player.tech_;
    tech.on('loadedqualitydata', onQualityData);
  }

  player.ready(init);
}

videojs.plugin('qualityPickerPlugin', qualityPickerPlugin);
