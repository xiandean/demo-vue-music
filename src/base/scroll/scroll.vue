<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      click: {
        type: Boolean,
        default: true
      },
      data: {
        type: Array,
        default: null
      },
      pullup: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      }
    },
    mounted () {
      this.$nextTick(() => {
        this._initScroll()
      })
    },
    activated () {
      this.refresh()
    },
    methods: {
      _initScroll () {
        if (!this.$refs.wrapper) {
          return false
        }
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click
        })

        if (this.listenScroll) {
          let me = this
          this.scroll.on('scroll', (pos) => {
            me.$emit('scroll', pos)
          })
        }

        if (this.pullup) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      enable () {
        if (this.scroll) {
          this.scroll.enable()
        }
      },
      disable () {
        if (this.scroll) {
          this.scroll.disable()
        }
      },
      refresh () {
        if (this.scroll) {
          this.scroll.refresh()
        }
      },
      scrollTo () {
        if (this.scroll) {
          this.scroll.scrollTo.apply(this.scroll, arguments)
        }
      },
      scrollToElement () {
        if (this.scroll) {
          this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
      }
    },
    watch: {
      data () {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
  }
</script>
