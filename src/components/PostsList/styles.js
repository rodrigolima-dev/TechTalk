import styled from 'styled-components/native';

export const Container = styled.View`
    border-top-width: .5px;
    border-top-color: gray;
    background-color: #202225;
    padding: 11px;


`;

export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    margin-bottom: 5px;
`

export const Avatar = styled.Image`
    width: 35px;
    height: 35px;
    border-radius: 20px;
    margin-right: 6px;

`;

export const Name = styled.Text`
    color: white;
    font-size: 15px;
    margin-left: 6px;
`

export const Content = styled.Text`
    color: white;
`

export const ContentView = styled.View``


export const Actions = styled.View`
    flex-direction: row;
    align-items: baseline;
    justify-content: space-between;
`

export const LikeButton = styled.TouchableOpacity`
    width: 55px;
    margin-top: 12px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`


export const Like = styled.Text`
    color: gray;
    margin-left: 6px;
    margin-right: 5px;
`

export const TimePost = styled.Text`
    margin-right: 6px;
    color: gray;
`  