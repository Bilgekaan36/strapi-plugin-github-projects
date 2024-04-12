import {
  Dialog,
  DialogBody,
  DialogFooter,
  Flex,
  Typography,
  Button,
} from '@strapi/design-system';
import { Trash } from '@strapi/icons';
import { ExclamationMarkCircle } from '@strapi/icons';

const ConfirmationDialog = ({
  visible,
  message,
  onClose,
  onConfirm,
}: {
  visible: any;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
}) => (
  <Dialog onClose={onClose} title='Confirmation' isOpen={visible}>
    <DialogBody icon={<ExclamationMarkCircle />}>
      <Flex direction='column' alignItems='center' gap={2}>
        <Flex justifyContent='center'>
          <Typography id='confirm-description'>{message}</Typography>
        </Flex>
      </Flex>
    </DialogBody>
    <DialogFooter
      startAction={
        <Button onClick={onClose} variant='tertiary'>
          Cancel
        </Button>
      }
      endAction={
        <Button
          variant='danger-light'
          startIcon={<Trash />}
          onClick={() => {
            onConfirm();
            onClose();
          }}
        >
          Confirm
        </Button>
      }
    />
  </Dialog>
);

export default ConfirmationDialog;
