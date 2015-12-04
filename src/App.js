import React, {Component} from 'react';
import PlayerManager from './components/player/PlayerManager';
import Search from './components/search/Search';
import ResultHeader from './components/results/ResultHeader';
import ResultList from './components/results/ResultList';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import {connect} from 'react-redux';
import * as playerActions from './actions/player';
import * as appActions from './actions/app';
import {VIEWS} from './constants/app';

class App extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='app-inner-wrapper'>
                { this.props.view == VIEWS.HOME ? this._getHomeLayout() : null }
                { this.props.view == VIEWS.RESULTS ? this._getResultsLayout() : null }
                { this.props.view == VIEWS.PLAYER ? this._getPlayerLayout() : null }
            </div>
        );
    }

    _getHomeLayout() {
        return (
            <div className='home-wrapper'>
                <div className='home-body'>
					<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="170px" height="70px" viewBox="0 0 170 70" className="intro-logo">
						<path fill="#FFFFFF" d="M147.644,16.975l-15.09,25.523l-1.397-25.523H112.98C109.47,8.202,101.121,1.793,88.694,1.793 c-9.448,0-17.716,3.906-23.894,10.084c-0.476,0.476-0.941,0.968-1.393,1.472C60.263,6.37,52.625,1.884,41.544,1.884 c-12.854,0-21.796,5.683-29.063,13.507l12.296,12.947c4.938-4.844,10.34-8.104,14.066-8.104c3.167,0,4.564,1.676,4.564,4.005 c0,1.957-0.558,4.099-5.682,7.266L4.378,51.999L0,68.207h78.61c9.45,0,17.716-3.906,23.895-10.084 c4.605-4.605,8.1-10.54,10.181-17.12l3.66,27.204h19.375L170,16.975H147.644z M46.203,44.64c2.367-1.31,4.455-2.596,6.297-3.865 c-0.036,0.752-0.055,1.508-0.055,2.265c0,2.814,0.415,5.55,1.217,8.121h-19.29L46.203,44.64z M87.149,46.766 c-1.907,1.908-4.087,2.999-6.631,2.999c-3.725,0-6.723-2.635-6.723-8.632c0-6.269,2.362-13.9,6.36-17.898 c1.908-1.908,4.088-2.998,6.633-2.998c3.724,0,6.723,2.635,6.723,8.631C93.511,35.136,91.148,42.768,87.149,46.766z"/>
					</svg>
                    <p className="intro-text">
                    	Create and enjoy a custom music channel based on a single song
                    </p>
                    <Search/>
                </div>
                <Footer></Footer>
            </div>
        );
    }

    _getResultsLayout() {
        return (
            <div className='results-wrapper'>
                <Header/>
                <ResultHeader/>
                <ResultList/>
                <Footer/>
            </div>
        );
    }

    _getPlayerLayout() {
        return (
            <div className='player-wrapper'>
                <PlayerManager
                    onClose={this._handleStopPlaying.bind(this)}
                    playlist={this._getFormattedList.bind(this)(this.props.resultList)}>
                </PlayerManager>
            </div>
        );
    }

    _handleStopPlaying() {
        //this.props.closePlayer();
        this.props.goToResults();
    }

    _getFormattedList(spotifyList) {
        return spotifyList.map(track => {
            return track.name + ' - ' + track.artists[0].name.substring(0, 40);
        });
    }

}

function mapStateToProps(state) {
    const {app,search,player} = state;
    return {
        searchText: search.searchText,
        resultList: search.resultList,
        showPlayer: player.isOpen,
        view: app.view
    };
}

export default connect(
    mapStateToProps,
    {
        openPlayer: playerActions.openPlayer,
        closePlayer: playerActions.closePlayer,
        goToResults: appActions.navigateToResults
    }
)(App);
