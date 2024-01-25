interface Data {
    Title: number;
    Genre: number;
    Type: number;
    Logline: string;
    Outline: number;
    User: string;
    Progress: any;
    Actions: any;
}

interface HeadCell {
    disablePadding: boolean
    dataIndex: string
    id: keyof Data
    label: string
    numeric: boolean
}

export const headerCells: readonly HeadCell[] = [
    {
      id: 'Title',
      dataIndex: "title",
      disablePadding: true, 
      label: "Title", 
      numeric: false
    },
    {
      id: 'Logline',
      dataIndex: "logline",
      disablePadding: true, 
      label: "Logline", 
      numeric: false
    },
    {
      id: 'Genre',
      dataIndex: "genre",
      disablePadding: true, 
      label: "Genre", 
      numeric: false
    },
    {
      id: 'Type',
      dataIndex: "type",
      disablePadding: true, 
      label: "Type", 
      numeric: false
    },
    {
      id: 'Progress',
      dataIndex: "progress",
      disablePadding: true, 
      label: "Progress", 
      numeric: false
    },
    {
      id: 'User',
      dataIndex: "user",
      disablePadding: true, 
      label: "User", 
      numeric: false
    },
    {
      id: 'Outline',
      dataIndex: "outline",
      disablePadding: true, 
      label: "Outline", 
      numeric: false
    },
    {
      id: 'Actions',
      dataIndex: "actions",
      disablePadding: true, 
      label: "", 
      numeric: false
    }
  ]