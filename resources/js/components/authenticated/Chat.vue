<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-4 p-0 list-container bg-white overflow-hidden">
          <!--   Search & Filter       -->
          <div class="p-4">
            <form class="form-inline">
              <label class="sr-only" for="inlineFormInputGroupUsername2">Username</label>
              <div class="input-group mb-2 mr-sm-2" style="width: 100%">
                <input type="text" v-model="search" class="form-control mx-1 bg-light border-0 text-dark" style="border-radius: 20px" id="inlineFormInputGroupUsername2" placeholder="Search" required @keyup="filterParticipants">
<!--                  <button type="submit" style="border-radius: 20px" class="btn btn-primary mx-1 border-0" :style="{'background-color': '#2b2d42'}">-->
<!--                    <font-awesome-icon class="font-weight-lighter" :icon="['fas', 'search']"></font-awesome-icon>-->
<!--                  </button>-->
              </div>
            </form>
          </div>

          <div>

            <ul v-if="participants" class="list px-4" style="overflow: auto; height: calc(var(--height-after-navbar) - 8.4rem)">
              <li v-for="participant of participants" @click.prevent="navigateToLoadConversation($event)" :key="participant._id">
                <div class="bg-image" :style="{'background-image': `url('${participant.companyImages.filter(img => img.type == 'logo')[0] ? participant.companyImages.filter(img => img.type == 'logo')[0].path.slice(3, participant.companyImages.filter(img => img.type == 'logo')[0].path.length): '/images/ezbunk.0caa7f64.png'}')`}"></div>
                <router-link :to="{name: 'chat', params: { user: participant._id }}" class="text-dark router-link text-decoration-none">{{ participant.companyName }}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div v-if="$route.params.user && currentParticipant" class="col-md-8 p-0 chat-container bg-white">
          <div class="navbar p-3 text-light" style="border-radius: 4px; background-color: #2b2d42;">{{ currentParticipant.companyName }}</div>
          <div v-if="conversation" class="wrapper" ref="conversationWrapper" style="padding: 10px;background-color: #f8f9fa; height: calc(100% - 7.5rem); overflow-y: auto;" >

            <div v-for="(message, idx) of conversation" :key="message._id" :class="`mx-2 my-1 text-light message ${message.sender._id == currentParticipant._id ? 'sender': ''}`">
              <p class="px-3 py-1" v-html="message.message"></p>
            </div>


          </div>

          <div v-else class="d-flex flex-column justify-content-center align-items-center" style="height: calc(100% - 7.5rem)">
            <font-awesome-icon class="font-weight-lighter fa-10x d-block" :icon="['fas', 'spinner']"></font-awesome-icon>
            <p class="my-2">Loading....</p>
          </div>

          <form class="form-inline my-3 mx-0" @submit.prevent="sendMessage">
            <label class="sr-only" for="sendMessage">Message</label>
            <div class="input-group mb-2 mr-sm-2" style="width: 100%;">
              <input type="text" v-model="message" class="form-control mx-1 bg-light border-0 text-dark" style="border-radius: 2px;" id="sendMessage" placeholder="Type a Message" required>
              <button type="submit" style="border-radius: 2px" class="btn btn-primary mx-1 border-0" :style="{'background-color': '#2b2d42'}">
                <font-awesome-icon class="font-weight-lighter" :icon="['fas', 'paper-plane']"></font-awesome-icon>
              </button>
            </div>
          </form>
        </div>

        <div v-else class="col-md-8 p-0 bg-white">
          <div class="d-flex flex-column justify-content-center align-items-center" style="height: calc(100% - 9rem)">
            <div>
              <font-awesome-icon class="font-weight-lighter fa-10x d-block" :icon="['fas', 'envelope-open']"></font-awesome-icon>
              <p class="my-2">Open a Conversation!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

const sanitizeHtml = require('sanitize-html')

export default {
  name: "Chat",

  data() {
    return {
      participants: null,
      conversation: null,

      message: null,
      search: null,
    }
  },

  created() {
    this.$socket.client.emit('participants')

    const { user } = this.$route.params
    if (user) {
      this.loadConversationEmission(user)
    }
  },

  updated() {
    let conversationWrapper = this.$refs.conversationWrapper
    if (conversationWrapper) {
      conversationWrapper.scrollTop = (conversationWrapper.clientHeight * conversationWrapper.clientHeight)
    }

  },

  watch: {
    '$route.params.user': function (user) {
      this.loadConversationEmission(user)
    }
  },

  computed: {
    currentParticipant() {
      let { user } = this.$route.params
      if (user && this.participants) {
        return this.participants.filter(participant => participant._id == user)[0]
      }
      return null
    }
  },

  sockets: {
    connect() {
      console.log('connected')
    },

    participants(data) {
      this.participants = data
    },

    conversation(data) {
      this.conversation = data
    },

    message(data) {
      this.conversation.push(data)
    }
  },

  methods: {
    filterParticipants() {
      if (this.participants && this.search) {
        this.participants = this.participants.filter(participant => participant.companyName.toLowerCase().includes(this.search.toLowerCase()) || this.search.toLowerCase().includes(participant.companyName.toLowerCase()))
      } else {
        this.$socket.client.emit('participants')
      }
    },

    navigateToLoadConversation($event) {
      let routerlink = $event.target.querySelector('.router-link')
      if (routerlink)
        routerlink.click()
    },

    loadConversationEmission(participant) {
      this.$socket.client.emit('conversation', { receiver: participant })
    },

    sendMessage() {
      let { user } = this.$route.params
      if (user) {
        this.$socket.client.emit('message', {
          message: sanitizeHtml(this.message),
          receiver: user
        })

        this.message = null
      }
    }
  }


}
</script>

<style scoped>

.list-container,
.chat-container {
  height: calc(var(--height-after-navbar) - 2rem);
}


.list {
  list-style: none;
  position: relative;
  padding: 0px !important;
}

.list li {
  padding: 1rem 1.8rem;
  border-radius: 3px;
  position: relative;
  cursor: pointer;
}

.list li > * {
  display: inline-block !important;
}

.list li > .text-dark {
  position: absolute;
  top: calc(25px + .3rem - .1rem);
  bottom: 0 !important;
  left: calc(50px + 1.3rem + 1.5rem);
  font-size: 18px;
}

.list li:hover, .list li.active {
  transition: all 500ms;
  background-color: #8d99ae;
  color: #ffffff;
}

.list li.active{
  pointer-events: none;
}

.bg-image {
  width: 50px;
  position: relative;
  background-size: cover;
  height: 50px !important;
  background-repeat: no-repeat;
  background-position: center center;
  background-color: #ffffff;
  position: relative;
  border-radius: 4px;
  background-color: #8d99ae;
  border-radius: 50%;
}

.message {
  display: flex;
}

.message.sender {
  flex-direction: row-reverse;
}

.message p {
  background-color: #335c67;
  border-radius: 2px;
  width: max-content;
}


.message.sender p {
  background-color: #540b0e;
}


</style>