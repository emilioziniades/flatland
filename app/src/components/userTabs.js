import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'

import CanvasHistory from  './CanvasHistory/canvasHistory'
import SquareManager from './SquareManager/squareManager'
import CanvasReplay from './CanvasReplay/canvasReplay'

const UserTabs = () => {

    const [key, setKey] = useState('squareManager')

    return(
        <Tabs
            defaultActiveKey='squareManager'
            activeKey={key}
            onSelect={(k) => {setKey(k)}}
            >
                <Tab 
                    eventKey='squareManager'
                    title='Manage'>
                        <SquareManager />
                </Tab>
                <Tab 
                    eventKey='canvasHistory'
                    title='History'>
                        <CanvasHistory />
                </Tab>
                <Tab 
                    eventKey='replay'
                    title='Replay'>
                        <CanvasReplay />
                </Tab>

        </Tabs>
    )
}

export default UserTabs