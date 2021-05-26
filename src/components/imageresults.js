import React,{useState} from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import ZoomInSharpIcon from '@material-ui/icons/ZoomInSharp';

 const Imageresults = ({images}) => {
     let imageListContent;
     let screenWidth = (window.innerWidth)/3;
     const [open,setOpen] = useState(false);
     const [currentImg,setCurrentImg] = useState('');
     const handleClickOpen = (img) => {
        setOpen(true);
        setCurrentImg(img);
      };
    
      const handleClose = (img) => {
        setOpen(false);
      };
    


     if(images){
        imageListContent = (
            <GridList cellHeight={180} cols={3} style={{width: {screenWidth} , height: 600}} >
                {/* <GridListTile key="Subheader" cols={3} style={{ height:'auto' }}>
                 <ListSubheader component="div">Image List</ListSubheader>
                </GridListTile> */}
              {images.map((img) => (
               <GridListTile key={img.id}  >
                <img src={img.largeImageURL} alt={img.tags} />
                <GridListTileBar
                title={img.tags}
                key={img.id}
              subtitle={<span>by: {img.user}</span>}
              actionIcon={
                <IconButton onClick={() => handleClickOpen(img.largeImageURL)}>
                  <ZoomInSharpIcon color="blue"/>
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
        )
     }
     else{
         imageListContent= null;
     }
    return (
        <div>
            {imageListContent}
            <Dialog 
              open={open}
              onClose={handleClose}
              modal={false}
            >
                <DialogContent>
                <img src={currentImg} alt="SearchedImage"  style={{ width: '100%'}}/>
                </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
               Close
              </Button>
            </DialogActions>
            </Dialog>
        </div>
    )
}

export default Imageresults;
