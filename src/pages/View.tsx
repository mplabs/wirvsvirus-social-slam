import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'
import { faHandHoldingHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Box, Flex, Link, Text } from 'rebass'
import styled from 'styled-components'
import { Layout } from '../components/Layout'
import Peer from 'simple-peer'
import { v5 as uuid } from 'uuid'
import './View.scss'
import { Chat } from '../components/VideoChat'

const tempInfo = {
  dateTime: '2020-04-27 20:00:00',
  title: 'Stream Title',
  tags: ['tag1', 'tag2'],
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  chat: [
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:01:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:02:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:03:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:04:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:01:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:02:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:03:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:04:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:01:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:02:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:03:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:04:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:01:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:02:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:03:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:04:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:01:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:02:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:03:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:04:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:01:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:02:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:03:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:04:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:01:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:02:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:03:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:04:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:01:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:02:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:03:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:04:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:01:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:02:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:03:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:04:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:01:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:02:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:03:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:04:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:01:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:02:00' },
    { user: 'user 1', text: 'Lorem ipsum', dateTime: '27.04.2020 20:03:00' },
    { user: 'user 2', text: 'Lorem ipsum', dateTime: '27.04.2020 20:04:00' },
  ],
}

export const View = (props) => {
  const socketRef = useRef()
  const peersRef = useRef<HTMLVideoElement>([])
  const [peers, setPeers] = useState([])
  const [viewerCount, setViewerCount] = useState(0)
  const [chatLog, setChatLog] = useState([])

  useEffect(() => {}, [])

  const createPeer = (socketId, callerId) => {
    const peer = new Peer({ initiator: true, trickle: false })

    peer.on('signal', (signal) => {
      socketRef.current.emit('send_signal', {
        socketId,
        callerId,
        signal,
      })
    })

    return peer
  }

  const addPeer = (incomingSignal, callerId) => {
    const peer = new Peer({
      initiator: false,
      trickle: false,
    })

    peer.on('signal', (signal) => {
      socketRef.current.emit('receive_signal', { signal, callerId })
    })

    peer.on('data', (newMsg) => {
      chatLog.push(newMsg)
      setChatLog(chatLog)
    })

    peer.signal(incomingSignal)

    return peer
  }

  const messagePeers = (newMsg) => {
    peers.forEach((peer) => {
      peer.send(newMsg)
    })
  }

  return (
    <Layout skipHeader={false} skipMenu={true}>
      <Flex flexWrap="wrap" mx={-2}>
        <Box
          width={9 / 12}
          px={2}
          py={2}
          style={{ borderRight: 'lightgrey 2px solid' }}
        >
          <Box m={2} style={{ border: 'grey 1px solid' }}>
            <VideoContainer streams={peersRef} />
          </Box>
          <Box m={2}>
            <MiscContainer viewerCount={viewerCount} streamers={['', '']} />
          </Box>
        </Box>
        <Box width={3 / 12} px={2} py={2}>
          {/* TODO: Replace the chat with a 3rd party module? */}
          <Chat
            chatLog={chatLog}
            onSend={(newMsg: string) => {
              newMsg.user = username
              chatLog.push(newMsg)
              setChatLog(chatLog)
              messagePeers(newMsg)
            }}
          />
        </Box>
      </Flex>
    </Layout>
  )
}