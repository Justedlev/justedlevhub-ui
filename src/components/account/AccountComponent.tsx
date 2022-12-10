import { Box, Card, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { RootState } from "../../store/store";
import MessageComponent from "../message/MessageComponent";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { pathLabel } from "../../config/menu";
import { accountByNickname, AccountState } from "../../store/features/account-slice";

function AccountComponent() {
  const dispatch = useAppDispatch();
  const { nickname } = useParams();
  const accountState: AccountState = useAppSelector((state: RootState) => state.account);
  const accessToken: string = useAppSelector((state: RootState) => state.login.response.token.accessToken);

  // useEffect(() => {
  //   console.log("🚀 ~ file: AccountComponent.tsx:18 ~ useEffect ~ useEffect")
  //   if (nickname) {
  //     dispatch(accountByNickname({ nickname }));
  //   }
  // }, [dispatch, nickname]);

  if (accountState.isLoading) {
    return (
      <Box sx={{ display: "flex", m: "50px auto" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isEmpty(accessToken)) {
    return <Navigate to={pathLabel.login.path} />;
  }

  return (
    <Box>
      {!isEmpty(accountState.error) && <MessageComponent isOpen message={accountState.error} type="error" />}
      <Card sx={{ maxWidth: 420, margin: "auto", marginTop: "50px" }}>
        <CardMedia
          component="img"
					height="390"
          image={`${accountState.response.photoUrl}`}
          alt={`${accountState.response.nickname}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {accountState.response.nickname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {accountState.response.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Full name: {accountState.response.firstName} {accountState.response.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Registration: {accountState.response.registrationDate}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Birth Date: {accountState.response.birthDate}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AccountComponent;
