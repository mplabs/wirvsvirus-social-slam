import React, { useEffect, useRef, useState } from 'react'

import { Layout } from '../components/Layout'
import { Box } from 'rebass'
import styled from 'styled-components'

export const Stream = (props) => {
  const socketRef = useRef<HTMLVideoElement>()
  const [peers, setPeers] = useState([])



  const streamId = props.match.params.streamId

  const tokens = {
    tokenA: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhbHBoYSIsImlhdCI6MTUxNjIzOTAyMn0.ok55AeE5LVEUYuWU4eLyBjdomKRBNtMoxuA3tkBMRuY',
    tokenB: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJicmF2byIsImlhdCI6MTUxNjIzOTAyMn0.n-Fsy8Jx6q9IubgaNZUgooNcsUG_58OVgE9MUTLkMVs',
  }

  useEffect(() => {
    socketRef.current =
  }, [])

  return <Layout skipHeader={true} skipMenu={true}></Layout>
}
