import {
    store
} from '../redux/store.js'
import {
    connect
} from 'pwa-helpers'
import {
    statsSelector
} from '../redux/reducer.js'
import '@vaadin/vaadin-charts'
import {
    html
} from 'lit-element'
import {
    BaseView
} from './base-view.js'

class StatsView extends connect(store)(BaseView) {
    static get properties() {
        return {
            chartConfig: {
                type: Object
            }
        }
    }

    stateChanged(state) {
        const stats = statsSelector(state)
        this.chartConfig = [{
                name: 'Completed',
                y: stats.completed
            },
            {
                Name: 'Active',
                y: stats.active
            }
        ]

        this.hasTodos = state.todos.length > 0
    }

    render() {
        return html `
      <style>
        stats-view {
          display: block;
        }
      </style>

      ${this.getChart()}
    `
    }

    getChart() {
        if (this.hasTodos) {
            return html `
        <vaadin-chart type="pie">
          <vaadin-chart-series
            .values="${this.chartConfig}"
          ></vaadin-chart-series>
        </vaadin-chart>
      `
        } else {
            return html `
        <p>Nothing to do &#x1F334;</p>
      `
        }
    }
}

customElements.define('stats-view', StatsView)