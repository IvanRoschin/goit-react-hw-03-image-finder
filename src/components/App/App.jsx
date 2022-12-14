import React, { Component } from 'react';
import { fetchImages } from 'Api/Api';
import Message from 'components/Message';
import Searchbar from 'components/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import LoadMoreButton from 'components/Button/';
import ImagesSkeleton from 'components/Skeleton';
import { Box } from 'components/Box/Box';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    images: [],
    request: '',
    page: 1,
    total: 0,
    error: null,
    message: '',
    status: Status.IDLE,
  };

  componentDidMount() {
    this.setState({
      message: 'To display pictures, enter a query in the search field',
    });
  }

  async componentDidUpdate(prevProps, prevState) {
    console.log(this.state.images);

    const { request, page } = this.state;
    if (prevState.request !== request || prevState.page !== page) {
      this.setState({
        status: Status.PENDING,
      });

      try {
        const images = await fetchImages(request, page);
        this.setState(prevState => ({
          images: [...prevState.images, ...images.hits],
          total: images.total,
          status: Status.RESOLVED,
          message: `Here is your ${request}s`,
        }));
      } catch (error) {
        this.setState({
          status: Status.REJECTED,
          message: `Sorry, but where are no images for your request ${request}`,
        });
      }
    }
  }

  handleFormSubmit = request => {
    this.setState({ request, images: [], page: 1, total: 0 });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, status, total, message } = this.state;

    return (
      <Box>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery images={images} />
        {status === 'idle' && <Message message={message} status={status} />}
        {status === 'pending' && <ImagesSkeleton />}
        {status === 'rejected' && <Message message={message} status={status} />}
        {status === 'resolved' && images.length < total && (
          <LoadMoreButton onClick={this.loadMore} />
        )}
      </Box>
    );
  }
}
