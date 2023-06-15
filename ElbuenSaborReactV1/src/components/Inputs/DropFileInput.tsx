import React, { useCallback, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'


const baseStyle = {
  flex: 1,
  display: 'flex',

  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

interface myProps {
  img?: any
  setImg: any
}

export function MyDropzone({ img, setImg }: myProps) {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive, acceptedFiles, isFocused, isDragAccept, isDragReject } = useDropzone({ accept: { "image/*": [] }, maxFiles: 1 })


  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  const acceptedFileItems = acceptedFiles.map(file => {
    setImg(file)
    return (
      <li key={file.name}>
        {file.name} - {file.size} bytes
      </li>

    )
  }
  );

  return (
    <section >
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Arraste alguna imagen aqui</p>
      </div>
      <aside style={{ marginTop: ".5rem", paddingLeft: "1rem" }}>
        <h4>Files</h4>
        <ul>{acceptedFileItems}</ul>
      </aside>
    </section>
  )
}