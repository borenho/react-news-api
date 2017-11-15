import React from 'react';
import { connect } from 'react-redux';
import { fetchArticleData } from '../../actions/articles/articlesListActions.jsx';
import PropTypes from 'prop-types';
import Articles from '../../components/articles/articlesAll.jsx';

class ArticlesContainer extends React.Component {
    componentDidMount() {
        this.props.fetchData(`https://newsapi.org/v1/articles?source=techcrunch&apiKey=e7e5240e9ad143ae9170058613e5d879`);
    }

    render() {
        if (this.props.hasErrored) {
            return (
                <p> Sorry an error occured while loading the page </p>
            );
        }

        if (this.props.isLoading) {
            return (
                <p>Loading Loading </p>
            );
        }

        return (
            <Articles articles={this.props.articles} />
        );
    }
}

const mapStateToProps = (state) => {
    return {
        articles: state.articles,
        hasErrored: state.articleHasErrored,
        isLoading: state.articleIsLoading
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(fetchArticleData(url))
    };
};

ArticlesContainer.propTypes = {
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    articles: PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesContainer);