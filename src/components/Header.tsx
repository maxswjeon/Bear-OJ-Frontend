import { Flex, Spacer, Text } from "@chakra-ui/react";
import { faRightFromBracket } from "@fortawesome/pro-solid-svg-icons";
import Logo from "assets/ycc_eagle_wholeblue.png";
import axios from "axios";
import Icon from "components/Icon";
import Image from "components/Image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuthStore } from "store/auth";

const Header = () => {
  const router = useRouter();
  const { setAuthenticated } = useAuthStore();
  const logout = async () => {
    await axios.delete(process.env.NEXT_PUBLIC_API_URL + "/session", {
      withCredentials: true,
    });

    setAuthenticated(false);

    router.push("/login");
  };

  return (
    <Flex as="header" alignItems="center" w="100%" fontSize="24pt" p="8pt">
      <Link href="/">
        <Flex cursor="pointer">
          <Image
            w="auto"
            h="auto"
            width="90px"
            height="40px"
            src={Logo}
            alt="YCC Logo"
          />
          <Text ml="8pt" fontWeight={600}>
            YCC 온라인 저지
          </Text>
        </Flex>
      </Link>
      <Spacer />
      <Icon onClick={logout} cursor="pointer" icon={faRightFromBracket} />
    </Flex>
  );
};

export default Header;
