import React, { useCallback, useState, ReactNode } from "react";
import PlusIcon from '../icons/plus.svg';
import './SignalNewCrime.css';
import styled from "styled-components";

import { Box, Flex } from "rebass";
import { Input, Label, Radio } from "@rebass/forms";


const StyledModal = styled.dialog`
  position: fixed;
  z-index: 2000;
  bottom: 0;
  border: 0;
  width: 95%;

  box-shadow:         0px -3px 5px 6px #ccc;
`;

const MyButton = styled.div<{ $color: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.8em;
  padding: 0.6em 0.8em;
  border-radius: 5px;
  color: white;
  transition: all 0.2s ease;
  cursor: pointer;
  justify-content: center;

  background: ${x => x.$color};
  box-shadow: 0px 2px 6px rgb(187, 187, 187);
  margin-right: 4px;
`;

const MyLabel = styled(Label)`
  font-size: 0.8em;
  line-height: 2;
`;

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: ReactNode }) => {


  return (
    <div style={{ position: 'relative' }}>
      <StyledModal open={isOpen}>
        {children}
        <Flex>
          <Box width={1 / 2}>

            <MyButton onClick={onClose} $color="gray">Close</MyButton>
          </Box>
          <Box width={1 / 2}>
            <MyButton onClick={onClose} $color="rgb(144, 142, 235)">Submit</MyButton>
          </Box>
        </Flex>
      </StyledModal>
    </div>
  )
}

const NewPostForm = () => {
  return (
    <Box
      as='form'
      onSubmit={e => e.preventDefault()}
      py={3}
    >
      <Flex mx={-2}>
        <Box width={1} px={2}>
          <Label htmlFor='name'>What would you like to do?</Label>
        </Box>
      </Flex>
      <Flex mx={-2} flexWrap='wrap' mb={4}>
        <MyLabel width={[1 / 2, 1 / 4]} p={2}>
          <Radio
            id='beep'
            name='beep'
            value='beep'
            defaultChecked
          />
          Launch a topic
        </MyLabel>
        <MyLabel width={[1 / 2, 1 / 4]} p={2}>
          <Radio
            id='boop'
            name='beep'
            value='boop'
          />
          Upload evidence
        </MyLabel>
      </Flex>
      <Flex mx={-2} mb={3}>
        <Box width={1} px={2}>
          <Label htmlFor='location'>Signal it!</Label>
          <Flex>
            <Box width={1 / 2} p={1}>
              <Input
                id='location'
                name='location'
                placeholder="Street name, city name"
              />
            </Box>

            <Box width={1 / 2} p={1}>
              <Input
                placeholder="Date"
                type="date"
              />
            </Box>
          </Flex>
          <Box p={1}>

            <Input
              placeholder="Title"
              type="Title"
            />
          </Box>
        </Box>
      </Flex>

    </Box>
  )
}

const Button = (props: any) => {

  const [isModalOpen, setModalOpen] = useState(false);
  const toggleModal = useCallback(() => setModalOpen(isOpen => !isOpen), []);

  return (
    <>
      <div className="signal-crime-button" onClick={toggleModal}>
        Signal a new crime
        <div className="signal-crime-icon">
          <img src={PlusIcon} alt="" />
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={toggleModal}>
        <NewPostForm />
      </Modal>
    </>
  )
};

export default Button;