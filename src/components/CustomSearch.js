import React from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { searchGameByName } from '../utils';
 
class CustomSearch extends React.Component {
  state = {
    displayModal: false
  }
 
  handleCancel = () => {
    this.setState({
      displayModal: false,
    })
  }
 
  searchOnClick = () => {
    this.setState({
      displayModal: true,
    })
  }
 
  onSubmit = (data) => {
    searchGameByName(data.game_name)
      .then((data) => {
        this.setState({
          displayModal: false,
        })
        this.props.onSuccess(data);
      })
      .catch((err) => {
        message.error(err.message);
      })
  }
 
  render = () => {
    return (
      <>
        <Button shape="round" onClick={this.searchOnClick} icon={<SearchOutlined />} style={{ marginLeft: '20px', marginTop: '20px'}}>
          Custom Search </Button>
        <Modal
          title="Search"
          visible={this.state.displayModal}
          onCancel={this.handleCancel}
          footer={null}
        >
          <Form
            name="custom_search"
            onFinish={this.onSubmit}
          >
            <Form.Item
              name="game_name"
              rules={[{ required: true, message: 'Please enter a game name' }]}
            >
              <Input placeholder="Game name" />
            </Form.Item>
 
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Search</Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    )
  }
}
 
export default CustomSearch;