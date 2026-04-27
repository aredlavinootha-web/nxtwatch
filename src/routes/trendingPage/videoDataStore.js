import { makeObservable, observable, action } from "mobx";


class VideoDataStore {
    constructor(each) {
        this.id = each.id;
        this.title = each.title;
        this.thumbnailUrl = each.thumbnail_url;
        this.channelName = each.channel.name;
        this.profileImageUrl = each.channel.profile_image_url;
        this.viewCount = each.view_count;
        this.publishedAt = each.published_at;
    }
}

export default VideoDataStore;