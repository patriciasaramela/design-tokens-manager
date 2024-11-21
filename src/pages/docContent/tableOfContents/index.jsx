import styled from '@emotion/styled';
import Typography from '@mui/material/Typography';
import IconType from '../iconType';

function TableOfContents(props) {

  const categorias = new Set(props.data?.map(item => item["Type"]))
  const listTableOfContents = [...categorias];

  listTableOfContents.sort();

  return (
    <TableOfContentsWrap>
      <ul>
        {listTableOfContents.map((element) =>
          <li key={element}>
            <a href={`#${element.replaceAll(" ", '-')}`}>
              <Typography variant="body2" color="#4d4d4d" fontSize={12} style={{ marginTop: 6 }}>
                {element}
              </Typography>
            </a>
            <IconType size={12} type={element} style={{ marginLeft: 4, marginTop: 4 }} />
          </li>
        )}
      </ul>
    </TableOfContentsWrap>
  )
}

export default TableOfContents




const TableOfContentsWrap = styled.div`
  border-left: 1px solid #e2dfdf;
  margin-left: 4px;
  padding: 6px;
  box-sizing: border-box;
  height: 100%;
  ul{
    list-style: none;
    margin: 8px 0;
    padding: 0;
    text-align: right;
  }
  li{
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
  a{
    text-decoration: none;
    text-align: right;
    &:hover{
      text-decoration: underline #4d4d4d;
    }
  }
`;
