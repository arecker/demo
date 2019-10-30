function get() {
  return [
    '#365',
    '#365challenge',
    '#365daychallenge',
    '#365dayproject',
    '#abmlifeisbeautiful',
    '#abmlifeiscolorful',
    '#abstractartist',
    '#abstractpainting',
    '#alcoholink',
    '#alcoholinkart',
    '#alcoholinkartist',
    '#art_collective',
    '#art_gallery',
    '#art_we_inspire',
    '#arte',
    '#artflow',
    '#artflowsession',
    '#artflowsessions',
    '#artflowsessions',
    '#artforsale',
    '#artgram',
    '#artiste',
    '#artsanity',
    '#astuaryart',
    '#bigmagic',
    '#calledtobecreative',
    '#carveouttimeforart',
    '#colorcrushcreative',
    '#colorpop',
    '#communityovercompetition',
    '#craftsposure',
    '#createcultivate',
    '#creativehappylife',
    '#creativityfound',
    '#cylcollective',
    '#dailychallenge',
    '#designsponge',
    '#doitfortheprocess',
    '#dsart',
    '#dscolor',
    '#fluidart',
    '#fluidartwork',
    '#foundforaged',
    '#handsandhustle',
    '#inspiremyinstagram',
    '#instartist',
    '#interiorandhome',
    '#interiorart',
    '#interiordecorating',
    '#interiorstyling',
    '#madison',
    '#madisonart',
    '#madisonartist',
    '#makersgonnamake',
    '#mixedmedia',
    '#mixedmediaart',
    '#mybeautifulmess',
    '#mycreativebiz',
    '#originalart',
    '#passioncolorjoy',
    '#postitfortheaesthetic',
    '#studioscenes',
    '#verilymoment',
    '#wisconsin',
    '#yupo',
    '#yupoart',
  ]
}

var app = new Vue({
  el: '#app',

  data: {
    newHashtag: '',
    chosenHashtags: [],
    availableHashtags: get(),
    deleteMode: false
  },

  methods: {
    alphabetized: function(list) {
      return list.concat().sort();
    },

    addNewHashtag: function() {
      var newOne = this.prependHashtag(this.newHashtag),
	  availableIndex = this.availableHashtags.indexOf(newOne);

      if (this.chosenHashtags.indexOf(newOne) !== -1) {
	toastr.warning(newOne + ' already in list');
	return;
      }

      if (availableIndex !== -1) {
	this.availableHashtags.splice(availableIndex, 1);
      }

      this.chosenHashtags.push(newOne);
      this.newHashtag = '';
    },

    addAllHashtags: function() {
      this.chosenHashtags = this.chosenHashtags.concat(this.availableHashtags);
      this.availableHashtags = [];
    },

    clearChosenHashtags: function() {
      this.availableHashtags = this.availableHashtags.concat(this.chosenHashtags);
      this.chosenHashtags = [];
    },

    toggleDeleteMode: function() {
      this.deleteMode = !this.deleteMode;
    },

    availableHashtagClick: function(key) {
      var index = this.availableHashtags.indexOf(key);

      if (this.deleteMode) {
	this.availableHashtags.splice(index, 1);
      } else {
	this.availableHashtags.splice(index, 1);
	this.chosenHashtags.push(key);
      }
    },

    removeChosenHashtag: function(key) {
      var index = this.chosenHashtags.indexOf(key);
      this.chosenHashtags.splice(index, 1);
      this.availableHashtags.push(key);
    },

    stripHashtag: function(value) {
      if (value.charAt(0) === '#') return value.substring(1);
      return value;
    },

    prependHashtag: function(value) {
      if (value.charAt(0) !== '#') return '#' + value;
      return value;
    },

    copyToClipboard: function() {
      var $temp = $("<input>");
      $("body").append($temp);
      $temp.val(this.chosenHashtags.join(' ')).select();
      document.execCommand("copy");
      $temp.remove();
      toastr.success('Sent ' + this.chosenHashtags.length + ' hashtag(s) to clipboard.')
    }
  },

  computed: {
    filteredAvailableHashtags: function() {
      var self = this;
      if (!this.newHashtag) return this.availableHashtags;
      return this.availableHashtags.filter(function(v) {
	var needle = self.stripHashtag(self.newHashtag),
	    hayStack = self.stripHashtag(v);

	return hayStack.indexOf(needle) !== -1;
      });
    }
  }
});
