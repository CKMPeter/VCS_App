import React, {useEffect, useState} from "react";
import { NavBar } from "./navBar";

const images = [
  {
    src: `${process.env.PUBLIC_URL}/cheerTeamImg.jpg`,
    name: "Cheerleading",
  },
  {
    src: `${process.env.PUBLIC_URL}/DanceImg.jpg`,
    name: "Dance",
  },
  {
    src: `${process.env.PUBLIC_URL}/cheerTeamImg1.jpg`,
    name: "VCS Team",
  },
  {
    src: `${process.env.PUBLIC_URL}/cheerTeamImg2.jpg`,
    name: "VCS Memories",
  },
];

const shows = [
  {
    src: `${process.env.PUBLIC_URL}/show1.jpg`,
    name: "Show 1",
    link: "https://www.youtube.com/watch?v=example1", // Replace with actual link
  },
  {
    src: `${process.env.PUBLIC_URL}/show2.jpg`,
    name: "Show 2",
    link: "https://www.youtube.com/watch?v=example2", // Replace with actual link
  },
  {
    src: `${process.env.PUBLIC_URL}/show3.jpg`,
    name: "Show 3",
    link: "https://www.youtube.com/watch?v=example3", // Replace with actual link
  },
];

export function MainPage() {
    const [showSecondLogo, setShowSecondLogo] = useState(false);

useEffect(() => {
  const timer1 = setTimeout(() => {
    setShowSecondLogo(true);
  }, 800);

  const timer2 = setTimeout(() => {
    setShowSecondLogo(false);
  }, 2400);

  return () => {
    clearTimeout(timer1);
    clearTimeout(timer2);
  };
}, []);
  return (
    <div style={styleSheet.root}>
      {/* <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;500;600;700&display=swap');
        `}
      </style> */}

      <NavBar />

      <div className="App">
        <div className="hero-container" style={styleSheet.heroContainer}>
          <div
  style={{
    position: "relative",
    width: "20%",
    overflow: "hidden",
  }}
>
  {/* Original logo */}
  <img
    src={`${process.env.PUBLIC_URL}/logoIdeaVCS.png`}
    alt="logo"
    style={{
      width: "100%",
      height: "auto",
      display: "block",
       clipPath: showSecondLogo
        ? "inset(0 0 0 100%)"
        : "inset(0 0 0 0)",
      transition: "clip-path 1s ease-in-out",
    }}
  />

  {/* Second logo revealed by the wipe */}
  <img
    src={`${process.env.PUBLIC_URL}/logo.png`}
    alt="logo"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "contain",
      display: "block",
      clipPath: showSecondLogo
        ? "inset(0 0 0 0)"
        : "inset(0 100% 0 0)",
      transition: "clip-path 1s ease-in-out",
    }}
  />
</div>
          <div>
            <h1 style={styleSheet.heroText}>
              Xin chào các bạn, chào mừng đến với Trang chủ của Verdancy
              Cheerleading Squad!
            </h1>
            <p style={styleSheet.heroDiscription}>
              Đây là nơi các bạn có thể check-in, xem danh sách các thành viên,
              và quản lý các thông tin liên quan đến đội. Hãy khám phá và tận
              hưởng trải nghiệm!
            </p>
          </div>

          {/* <h1 className="title" style={styleSheet.title}>
            Verdancy
          </h1> */}
        </div>

        <div style={styleSheet.alternateContainer}>
          {/* <div className="main">
            <img
              src="/Northern Lights3.png"
              alt="Northern Lights"
              className="logo"
            />
          </div>

          <div className="side">side</div>
        </div> */}
          <h1 style={styleSheet.title}>Một Chút Về Cheerleading</h1>
          <div style={styleSheet.InfoContainer}>
            <img
              src={`${process.env.PUBLIC_URL}/Promo.jpg`}
              alt="About Us"
              style={styleSheet.aboutCheerImg}
            />
            <div style={{ maxWidth: "800px", marginLeft: "2rem" }}>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#333",
                  lineHeight: "1.6",
                  paddingBottom: "12vh",
                }}
              >
                <strong>Cheerleading</strong> là một môn thể thao kết hợp giữa
                thể dục dụng cụ, nhảy múa và cổ vũ. Các thành viên trong đội
                thường thực hiện các động tác nhảy, xoay người, nâng đỡ và tạo
                hình để tạo ra những màn trình diễn ấn tượng và đầy năng lượng.
                Môn thể thao này không chỉ giúp cải thiện sức khỏe và thể lực mà
                còn phát triển khả năng phản xạ và làm việc nhóm.
              </p>
              <div
                style={{
                  display: "flex",
                  overflow: "hidden",
                  width: "100%",
                  marginTop: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexShrink: 0,
                    animation: "slide 15s linear infinite",
                  }}
                >
                  {[...images, ...images].map((src, index) => (
                    <img
                      key={index}
                      src={src.src}
                      alt="About Us"
                      style={{
                        width: "30vw",
                        height: "auto",
                        marginRight: "2rem",
                        flexShrink: 0,
                      }}
                    />
                  ))}
                </div>

                <style>
                  {`
      @keyframes slide {
        from {
          transform: translateX(0);
        }
        to {
          transform: translateX(calc(-150vw - 3rem));
        }
      }
    `}
                </style>
              </div>
            </div>
          </div>
        </div>

        <div style={styleSheet.Container}>
          <h1 style={styleSheet.title}>Một Chút Về Đội Của Tụi Mình</h1>
          {/* <img src={`${process.env.PUBLIC_URL}/Founder.jpg`} alt="team" style={{ width: "20%", height: "auto", marginTop: "1rem", borderRadius: "50%" }} />
            <p style={{ fontSize: "1.2rem", color: "#333", lineHeight: "1.6", padding: "0 1rem", textAlign: "center", marginTop: "1rem" }}>
                Đây là Founder của đội người đã 
            </p> */}
          <div
            style={{
              height: "80%",
              display: "flex",
              flexDirection: "row",
              gap: "2rem",
              marginTop: "1rem",
            }}
          >
            <div
              style={{
                flex: 2,
                display: "flex",
                flexDirection: "column",
                padding: "0",
              }}
            >
              <div
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  maxWidth: "800px",
                  textAlign: "left",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    fontSize: "1.2rem",
                    color: "#333",
                    lineHeight: "1.6",
                    padding: "0 1rem",
                    textAlign: "left",
                    marginTop: "1rem",
                  }}
                >
                  Đội tui mình được thành lập vào năm 2023, trực thuộc trường
                  đại học Công Nghệ Kĩ Thuật TP.HCM cụ thể là Khoa Đào Tạo Tiên
                  Tiến, với mục tiêu mang đến những màn trình diễn ấn tượng và
                  đầy năng lượng. Chúng mình luôn tìm kiếm những thành viên mới
                  để cùng nhau phát triển và tạo ra những trải nghiệm tuyệt vời.
                </p>
                <div
                  style={{
                    display: "flex",
                    gap: "12px",
                    marginTop: "1rem",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/LogoHCM-UTE.png`}
                    style={{ width: "30%", height: "auto" }}
                  />
                  <img
                    src={`${process.env.PUBLIC_URL}/LogoFAE.png`}
                    style={{ width: "25%", height: "auto" }}
                  />
                </div>
              </div>
              <p
                style={{
                  fontSize: "1.2rem",
                  color: "#333",
                  lineHeight: "1.6",
                  padding: "0 1rem",
                  textAlign: "center",
                  marginTop: "1rem",
                  border: "1px solid #ccc",
                  borderRadius: "0.5rem",
                  padding: "1rem",
                  maxWidth: "800px",
                }}
              >
                Hãy cùng nhau tạo ra những khoảnh khắc đáng nhớ và truyền cảm
                hứng cho mọi người thông qua Cheerleading!
              </p>
            </div>

            <div
              style={{
                flex: 0.5,
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "0.5rem",
                padding: "1rem",
                boxSizing: "border-box",
                height: "97%",
              }}
            >
              {images.map((item, index) => (
                <div
                  key={index}
                  className="record-item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    height: "120px",
                    border: "2px solid transparent",
                    transition: "all 0.3s ease",
                    boxSizing: "border-box",
                    borderRadius: "0.5rem",
                  }}
                >
                  <img
                    src={item.src}
                    alt={item.name}
                    style={{
                      height: "100%",
                      width: "120px",
                      objectFit: "cover",
                        borderRadius: "0.5rem",
                    }}
                  />

                  <div
                    className="record-name"
                    style={{
                      opacity: 0,
                      transform: "translateX(-20px)",
                      marginLeft: "1rem",
                      transition: "all 0.3s ease",
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#002B00",
                      
                    }}
                  >
                    {item.name}
                  </div>
                </div>
              ))}

              <style>
                {`
      .record-item:hover {
        border: 2px solid #002B00 !important;
        
      }

      .record-item:hover .record-name {
        opacity: 1 !important;
        transform: translateX(0) !important;
      }
    `}
              </style>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styleSheet = {
  root: {
    width: "100%",
    minHeight: "100vh",
  },

  title: {
    //fontFamily: "'Dancing Script', cursive",
    fontSize: "2rem",
    color: "#002B00",
    textAlign: "center",
    marginTop: "1rem",
    fontWeight: "bold",
    paddingBottom: "1rem",
  },

  heroContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    // Navbar is 70px tall
    height: "calc(100vh - 70px)",
    minHeight: "calc(100vh - 70px)",
  },
  Container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    // Navbar is 70px tall
    height: "100vh",
  },
  alternateContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    // Navbar is 70px tall
    height: "100vh",
    minHeight: "calc(100vh - 70px)",

    backgroundColor: "#f0f0f0", // Light gray background
  },
  heroText: {
    fontSize: "2rem",
    color: "#333",
    textAlign: "center",
    marginTop: "1rem",
  },
  heroDiscription: {
    fontSize: "1.5rem",
    color: "#666",
    textAlign: "center",
    marginTop: "0",
    padding: "0 1rem",
  },
  aboutCheerImg: {
    height: "100%",
  },
  InfoContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "80%",
  },
};
