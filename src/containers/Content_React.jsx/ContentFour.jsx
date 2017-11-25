// import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有
// import ReactDOM, { render } from 'react-dom'; // 渲染组件时需要
// import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom'

// //连接redux
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { is, fromJS } from 'immutable';
// import { ListView } from 'antd-mobile';

// function MyBody(props) {
//     return (
//         <div className="am-list-body my-body">
//             <span style={{ display: 'none' }}>you can custom body wrap element</span>
//             {props.children}
//         </div>
//     );
// }

// const data = [
//     {
//         img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
//         title: 'Meet hotel',
//         des: '啦啦啦啦啦啦啦啦1111111111111111啦啦啦啦啦啦啦啦啦啦',
//     },
//     {
//         img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
//         title: 'McDonald\'s invites you',
//         des: '不是所有的兼职汪都需要风吹日晒',
//     },
//     {
//         img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
//         title: 'Eat the week',
//         des: '啦啦啦啦啦啦啦啦33333333333333啦啦啦啦啦啦啦啦啦啦',
//     },
// ];

// //长列表。。。。。
// class Demo extends React.Component {
//     constructor(props) {
//         super(props);
//         const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
//         const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

//         const dataSource = new ListView.DataSource({
//             getRowData,
//             getSectionHeaderData: getSectionData,
//             rowHasChanged: (row1, row2) => row1 !== row2,
//             sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
//         });
//         this.NUM_SECTIONS = 5;
//         this.NUM_ROWS_PER_SECTION = 5;
//         this.pageIndex = 0;

//         this.dataBlobs = {};
//         this.sectionIDs = [];
//         this.rowIDs = [];
//         this.state = {
//             dataSource,
//             isLoading: true,
//             height: document.documentElement.clientHeight * 3 / 4,
//         };
//     }

//     _genData = (pIndex = 0) => {
//         for (let i = 0; i < this.NUM_SECTIONS; i++) {
//             const ii = (pIndex * this.NUM_SECTIONS) + i;
//             const sectionName = `Section ${ii}`;
//             this.sectionIDs.push(sectionName);
//             this.dataBlobs[sectionName] = sectionName;
//             this.rowIDs[ii] = [];

//             for (let jj = 0; jj < this.NUM_ROWS_PER_SECTION; jj++) {
//                 const rowName = `S${ii}, R${jj}`;
//                 this.rowIDs[ii].push(rowName);
//                 this.dataBlobs[rowName] = rowName;
//             }
//         }
//         this.sectionIDs = [...this.sectionIDs];
//         this.rowIDs = [...this.rowIDs];
//     }
//     componentDidMount() {
//         // you can scroll to the specified position
//         // setTimeout(() => this.lv.scrollTo(0, 120), 800);

//         const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
//         // simulate initial Ajax
//         setTimeout(() => {
//             this._genData()
//             // genData();
//             this.setState({
//                 dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlobs, this.sectionIDs, this.rowIDs),
//                 isLoading: false,
//                 height: hei,
//             });
//         }, 600);
//     }

//     // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
//     // componentWillReceiveProps(nextProps) {
//     //   if (nextProps.dataSource !== this.props.dataSource) {
//     //     this.setState({
//     //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
//     //     });
//     //   }
//     // }

//     onEndReached = (event) => {
//         if (this.state.isLoading && !this.state.hasMore) {
//             return;
//         }
//         console.log('reach end', event);
//         this.setState({ isLoading: true });
//         setTimeout(() => {
//             // genData(++pageIndex);
//             this._genData(++this.pageIndex);

//             this.setState({
//                 dataSource: this.state.dataSource.cloneWithRowsAndSections(this.dataBlobs, this.sectionIDs, this.rowIDs),
//                 isLoading: false,
//             });
//         }, 1000);
//     }

//     render() {
//         // console.log('conetFour--this.props',this.props);
//         console.log('this.state.dataSource', this.state.dataSource)

//         const separator = (sectionID, rowID) => (
//             <div
//                 key={`${sectionID}-${rowID}`}
//                 style={{
//                     backgroundColor: '#F5F5F9',
//                     height: 8,
//                     borderTop: '1px solid #ECECED',
//                     borderBottom: '1px solid #ECECED',
//                 }}
//             />
//         );
//         let index = data.length - 1;
//         const row = (rowData, sectionID, rowID) => {
//             console.log('conetFour--this.rowData', rowData);
//             console.log('conetFour--this.sectionID', sectionID);
//             console.log('conetFour--this.rowID', rowID);


//             if (index < 0) {
//                 index = data.length - 1;
//             }
//             const obj = data[index--];
//             return (
//                 <div key={rowID} style={{ padding: '0 15px' }}>
//                     <div
//                         style={{
//                             lineHeight: '50px',
//                             color: '#888',
//                             fontSize: 18,
//                             borderBottom: '1px solid #F6F6F6',
//                         }}
//                     >{obj.title}</div>
//                     <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
//                         <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
//                         <div style={{ lineHeight: 1 }}>
//                             <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
//                             <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div>
//                         </div>
//                     </div>
//                 </div>
//             );
//         };

//         return (
//             <ListView
//                 ref={el => this.lv = el}
//                 dataSource={this.state.dataSource}
//                 renderHeader={() => <span>headersdsdsad</span>}
//                 renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
//                     {this.state.isLoading ? 'Loading...' : 'Loaded'}
//                 </div>)}
//                 renderSectionHeader={sectionData => (
//                     <div>{`Task ${sectionData.split(' ')[1]}`}</div>
//                 )}
//                 renderBodyComponent={() => <MyBody />}
//                 renderRow={row}
//                 renderSeparator={separator}
//                 style={{
//                     height: this.state.height,
//                     overflow: 'auto',
//                 }}
//                 pageSize={1}
//                 onScroll={() => { console.log('scroll'); }}
//                 scrollRenderAheadDistance={500}
//                 onEndReached={this.onEndReached}
//                 onEndReachedThreshold={10}
//             />
//         );
//     }
// }

// export default Demo

// import { ListView, Toast } from 'antd-mobile';
// import fetch from 'isomorphic-fetch'
// import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有

// import ReactDOM from 'react-dom';

// // let MobileDemo = React.createClass({
// class MobileDemo extends Component {
//     constructor(props) {
//         super(props);
//         this.data = []
//         this.dataSource = new ListView.DataSource({
//             rowHasChanged: (row1, row2) => row1.name !== row2.name
//         })
//         this.state = {
//             isLoading: false,
//             pageNum: 1,
//             dataSource: this.dataSource.cloneWithRows(this.data),
//             fetchDone: false
//         }
//     }
//     componentWillMount() {
//         this.getData()
//     }
//     getData() {
//         if (this.state.isLoading || this.state.fetchDone) {
//             return
//         }

//         this.setState({ isLoading: true })
//         fetch('/items' + '?page=' + this.state.pageNum).then(response => response.json()).then(items => {
//             this.setState({ isLoading: false })
//             if (items.length) {
//                 this.data = this.data.concat(items)
//                 this.setState({
//                     dataSource: this.dataSource.cloneWithRows(this.data),
//                     pageNum: ++this.state.pageNum
//                 })
//             } else {
//                 this.setState({ fetchDone: true })
//                 Toast.info('没有更多的记录', 1)
//             }
//         })
//     }

//     renderListViewRow(rowData) {
//         return (
//             <div style={{
//                 padding: '.07rem .25rem',
//                 border: '.01rem solid #ddd',
//                 borderRadius: '0.1rem',
//                 backgroundColor: '#fff'
//             }}>
//                 <div style={{ marginLeft: '.25rem' }}>
//                     <div style={{ height: '.62rem', fontSize: '.62rem' }}>{rowData.name}</div>
//                     <div style={{ borderTop: '.01rem solid #ddd' }}>{rowData.desc}</div>
//                 </div>
//             </div>
//         )
//     }

//     renderListViewSeparator(sectionID, rowID) {
//         return (
//             <div key={`separator-${sectionID}-${rowID}`} style={{ backgroudColor: '#f5f5f5', height: '0.3rem' }} />
//         )
//     }

//     render() {
//         return (
//             <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                 <div style={{ height: '0.9rem', textAlign: 'center' }}>navbar div</div>
//                 <ListView
//                     dataSource={this.state.dataSource}
//                     renderHeader={() => <span>列表</span>}
//                     renderRow={this.renderListViewRow}
//                     renderSeparator={this.renderListViewSeparator}
//                     onEndReached={this.getData}
//                     style={{
//                         height: document.body.clientHeight - 190,
//                         overflow: 'auto',
//                     }}
//                     initialListSize={0}
//                     pageSize={10}
//                 />
//                 <div style={{ height: '1rem', textAlign: 'center' }}>tabbar div</div>
//             </div>
//         );
//     }
// };

// export default MobileDemo



/**
 * 长列表原版
 */
import React, { Component, PropTypes } from 'react'; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有
import ReactDOM, { render } from 'react-dom'; // 渲染组件时需要
import { BrowserRouter, Route, Link, withRouter } from 'react-router-dom'
import { ListView } from 'antd-mobile';

function MyBody(props) {
    return (
        <div className="am-list-body my-body">
            <span style={{ display: 'none' }}>you can custom body wrap element</span>
            {props.children}
        </div>
    );
}

const data = [
    {
        img: 'https://zos.alipayobjects.com/rmsportal/dKbkpPXKfvZzWCM.png',
        title: 'Meet hotel',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/XmwCzSeJiqpkuMB.png',
        title: 'McDonald\'s invites you',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
    {
        img: 'https://zos.alipayobjects.com/rmsportal/hfVtzEhPzTUewPm.png',
        title: 'Eat the week',
        des: '不是所有的兼职汪都需要风吹日晒',
    },
];
const NUM_SECTIONS = 5;
const NUM_ROWS_PER_SECTION = 5;
let pageIndex = 0;

//数据块
const dataBlobs = {};
let sectionIDs = [];
let rowIDs = [];
function genData(pIndex = 0) {
    for (let i = 0; i < NUM_SECTIONS; i++) {
        const ii = (pIndex * NUM_SECTIONS) + i;
        const sectionName = `Section ${ii}`;
        sectionIDs.push(sectionName);
        dataBlobs[sectionName] = sectionName;
        rowIDs[ii] = [];
        
        for (let jj = 0; jj < NUM_ROWS_PER_SECTION; jj++) {
            const rowName = `S${ii}, R${jj}`;
            rowIDs[ii].push(rowName);
            dataBlobs[rowName] = rowName;
        }
    }

    sectionIDs = [...sectionIDs];
    console.log(sectionIDs);
    rowIDs = [...rowIDs];
}

class Demo extends React.Component {
    constructor(props) {
        super(props);
        //头部数据
        const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
        //行数据
        const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

        const dataSource = new ListView.DataSource({
            getRowData,
            getSectionHeaderData: getSectionData,
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
        });

        this.state = {
            dataSource,
            isLoading: true,
            height: document.documentElement.clientHeight * 3 / 4,
        };
    }

    componentDidMount() {
        // you can scroll to the specified position
        // setTimeout(() => this.lv.scrollTo(0, 120), 800);

        const hei = document.documentElement.clientHeight - ReactDOM.findDOMNode(this.lv).parentNode.offsetTop;
        // simulate initial Ajax
        setTimeout(() => {
            genData();
            this.setState({
                //clone With Rows And Sections行列克隆
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
                height: hei,
            });
        }, 600);
    }

    // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
    // componentWillReceiveProps(nextProps) {
    //   if (nextProps.dataSource !== this.props.dataSource) {
    //     this.setState({
    //       dataSource: this.state.dataSource.cloneWithRowsAndSections(nextProps.dataSource),
    //     });
    //   }
    // }

    onEndReached = (event) => {
        // load new data
        // hasMore: from backend data, indicates whether it is the last page, here is false
        if (this.state.isLoading && !this.state.hasMore) {
            return;
        }
        console.log('reach end', event);
        this.setState({ isLoading: true });
        setTimeout(() => {
            genData(++pageIndex);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlobs, sectionIDs, rowIDs),
                isLoading: false,
            });
        }, 1000);
    }

    render() {
        const separator = (sectionID, rowID) => (
            <div
                key={`${sectionID}-${rowID}`}
                style={{
                    backgroundColor: '#F5F5F9',
                    height: 8,
                    borderTop: '1px solid #ECECED',
                    borderBottom: '1px solid #ECECED',
                }}
            />
        );
        let index = data.length - 1;
        const row = (rowData, sectionID, rowID) => {
            if (index < 0) {
                index = data.length - 1;
            }
            const obj = data[index--];
            return (
                <div key={rowID} style={{ padding: '0 15px' }}>
                    <div
                        style={{
                            lineHeight: '50px',
                            color: '#888',
                            fontSize: 18,
                            borderBottom: '1px solid #F6F6F6',
                        }}
                    >{obj.title}</div>
                    <div style={{ display: '-webkit-box', display: 'flex', padding: '15px 0' }}>
                        <img style={{ height: '64px', marginRight: '15px' }} src={obj.img} alt="" />
                        <div style={{ lineHeight: 1 }}>
                            <div style={{ marginBottom: '8px', fontWeight: 'bold' }}>{obj.des}</div>
                            <div><span style={{ fontSize: '30px', color: '#FF6E27' }}>35</span>¥ {rowID}</div>
                        </div>
                    </div>
                </div>
            );
        };

        return (
            <ListView
                ref={el => this.lv = el}
                dataSource={this.state.dataSource}
                renderHeader={() => <span>header</span>}
                renderFooter={() => (<div style={{ padding: 30, textAlign: 'center' }}>
                    {this.state.isLoading ? 'Loading...' : 'Loaded'}
                </div>)}
                renderSectionHeader={sectionData => (
                    <div>{`Task ${sectionData.split(' ')[1]}`}</div>
                )}
                renderBodyComponent={() => <MyBody />}
                renderRow={row}
                renderSeparator={separator}
                style={{
                    height: this.state.height,
                    overflow: 'auto',
                }}
                pageSize={4}
                onScroll={() => { console.log('scroll'); }}
                scrollRenderAheadDistance={500}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={10}
            />
        );
    }
}

export default Demo

