import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'media-learn',
  templateUrl: './media-learn.component.html',
  styleUrls: ['./media-learn.component.css']
})
export class MediaLearnComponent implements OnInit {
  isMuted = false;
  tag1;
  tag2;
  @ViewChild('videos') videos: HTMLElement;
  @ViewChild('audios') audios: HTMLElement;
  videoIntervalTime;
  audioIntervalTime;

  videoSrc: string = '';
  videoType: string = '';

  audioSrc: string = '';
  audioType: string = '';

  canShowVideo = false;
  canShowAudio = false;

  constructor() { }

  ngOnInit() {
  }
  ngAfterViewInit() {
    // 检测浏览器是否能播放指定的音频/视频类型。
    let videoType = ["video/mp4", "audio/ogg", "video/webm"];
    let audioType = ["audio/ogg", "audio/aac", "audio/flac", "audio/mp3", "audio/wav"];  // 所有的音频格式

    this.tag1 = this.videos['nativeElement'];
    this.tag2 = this.audios['nativeElement'];

    let isVideoSupport = videoType.some(data => this.whichType(data, this.tag1));
    let isAudioSupport = audioType.some(data => this.whichType(data, this.tag2));

    if (!isVideoSupport) {
      console.log('当前设备不支持视频媒体列表！')
    }
    if (!isAudioSupport) {
      console.log('当前设备不支持视频媒体列表！')
    }
    setTimeout(_ => {
      if (isVideoSupport) {
        this.canShowVideo = true;
      }
      if (isAudioSupport) {
        this.canShowAudio = true;
      }
    })
  }
  whichType(text: string, tag): boolean {
    let test = tag.canPlayType(text);
    if (tag.tagName === 'VIDEO') {
      if (test) {
        let files = text.split('/')[1];
        this.videoSrc = `assets/mediaFiles/now.${files}`;
        this.videoType = text;
        return true
      } else {
        return false
      }
    };
    if (tag.tagName === 'AUDIO') {
      if (test) {
        let files = text.split('/')[1];
        this.audioSrc = `assets/mediaFiles/jiang.${files}`;
        this.audioType = text;
        return true
      } else {
        return false
      }
    }
  }

  videoTime;
  audioTime;
  Play(target) {
    if (target.tagName === 'VIDEO') {
      target.play();
      this.videoIntervalTime = setInterval(_ => {
        let nowSpeed = target['currentTime'];  //音频/视频中的当前播放位置（以秒计）
        let total = target['duration'];  // 当前音频/视频的长度（以秒计）

        if (nowSpeed === total) {
          clearInterval(this.videoIntervalTime);
        } else if (total) {
          this.videoTime = Math.floor((nowSpeed / total) * 100) + ' %';
        } else {
          this.audioTime = ''
        }
      }, 200)
    }

    if (target.tagName === 'AUDIO') {
      target.play();

      this.audioIntervalTime = setInterval(_ => {
        let nowSpeed = target['currentTime'];  //音频/视频中的当前播放位置（以秒计）
        let total = target['duration'];  // 当前音频/视频的长度（以秒计）
        if (nowSpeed === total) {
          clearInterval(this.audioIntervalTime);
        } else if (total) {
          this.audioTime = Math.floor((nowSpeed / total) * 100) + ' %';
        } else {
          this.audioTime = ''
        }
      }, 200)
    }
  }
  Pause(target) {
    target.pause()
  }
  Muted(target) {
    this.isMuted = !this.isMuted;
  }
  Load(target) {
    target.load();
    target.play()
  }
  Stop(target) {
    target.load();

    if (target.tagName === 'VIDEO') {
      this.videoTime = '';
      clearInterval(this.videoIntervalTime);
    }
    if (target.tagName === 'AUDIO') {
      this.audioTime = '';
      clearInterval(this.audioIntervalTime);
    }
  }
  Before(target) {
    let currentsrc = target['currentSrc'];
    if (target.tagName === 'VIDEO') {
      target['src'] = 'assets/mediaFiles/before.mp4';
    }
    if (target.tagName === 'AUDIO') {
      target['src'] = 'assets/mediaFiles/before.mp3';
    }
    this.Play(target)
  }
  Next(target) {
    let currentsrc = target['currentSrc'];
    if (target.tagName === 'VIDEO') {
      target['src'] = 'assets/mediaFiles/next.mp4';
    }
    if (target.tagName === 'AUDIO') {
      target['src'] = 'assets/mediaFiles/next.mp3';
    }
    this.Play(target)
  }
  UpVol(target) {
    if (target.volume.toFixed(1) >= 1) {
      target.volume = 1
    } else {
      target.volume += 0.1;
    }
  }
  DownVol(target) {
    if (target.volume.toFixed(1) <= 0) {
      target.volume = 0
    } else {
      target.volume -= 0.1;
    }
  }
  ngOnDestroy(): void {
    this.Stop(this.videos['nativeElement'])
    this.Stop(this.audios['nativeElement'])
  }
}
