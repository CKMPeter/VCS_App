import React, { useEffect, useState } from "react";
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
    link: "https://www.youtube.com/watch?v=example1",
  },
  {
    src: `${process.env.PUBLIC_URL}/show2.jpg`,
    name: "Show 2",
    link: "https://www.youtube.com/watch?v=example2",
  },
  {
    src: `${process.env.PUBLIC_URL}/show3.jpg`,
    name: "Show 3",
    link: "https://www.youtube.com/watch?v=example3",
  },
];

/* =========================================================
   WINDOW SIZE HOOK
========================================================= */

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowSize;
}

/* =========================================================
   MAIN PAGE
========================================================= */

export function MainPage() {
  const [showSecondLogo, setShowSecondLogo] = useState(false);
  const [hoveredRecord, setHoveredRecord] = useState(null);

  const { width } = useWindowSize();

  const responsive = styleSheet.responsive(width);

  /* =========================================================
     LOGO ANIMATION
  ========================================================= */

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
      {/* =====================================================
          ANIMATION ONLY
      ===================================================== */}

      <style>
        {`
          @keyframes slide {
            from {
              transform: translateX(0);
            }

            to {
              transform: translateX(-50%);
            }
          }
        `}
      </style>

      <NavBar />

      <div className="App">

        {/* =====================================================
            HERO SECTION
        ===================================================== */}

        <div
          style={{
            ...styleSheet.heroContainer,
            ...responsive.heroContainer,
          }}
        >
          {/* LOGO */}

          <div
            style={{
              ...styleSheet.logoWrapper,
              ...responsive.logoWrapper,
            }}
          >
            {/* Original logo */}

            <img
              src={`${process.env.PUBLIC_URL}/logoIdeaVCS.png`}
              alt="Verdancy Cheerleading Squad Logo"
              style={{
                ...styleSheet.logo,

                clipPath: showSecondLogo
                  ? "inset(0 0 0 100%)"
                  : "inset(0 0 0 0)",

                transition: "clip-path 1s ease-in-out",
              }}
            />

            {/* Second logo */}

            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="VCS Logo"
              style={{
                ...styleSheet.secondLogo,

                clipPath: showSecondLogo
                  ? "inset(0 0 0 0)"
                  : "inset(0 100% 0 0)",

                transition: "clip-path 1s ease-in-out",
              }}
            />
          </div>

          {/* HERO TEXT */}

          <div>
            <h1
              style={{
                ...styleSheet.heroText,
                ...responsive.heroText,
              }}
            >
              Xin chào các bạn, chào mừng đến với Trang chủ
              của Verdancy Cheerleading Squad!
            </h1>

            <p
              style={{
                ...styleSheet.heroDescription,
                ...responsive.heroDescription,
              }}
            >
              Đây là nơi các bạn có thể check-in, xem danh sách
              các thành viên, và quản lý các thông tin liên quan
              đến đội. Hãy khám phá và tận hưởng trải nghiệm!
            </p>
          </div>
        </div>

        {/* =====================================================
            CHEERLEADING SECTION
        ===================================================== */}

        <div
          style={{
            ...styleSheet.alternateContainer,
            ...responsive.alternateContainer,
          }}
        >
          <h1
            style={{
              ...styleSheet.title,
              ...responsive.title,
            }}
          >
            Một Chút Về Cheerleading
          </h1>

          <div
            style={{
              ...styleSheet.InfoContainer,
              ...responsive.InfoContainer,
            }}
          >
            {/* PROMO IMAGE */}

            <img
              src={`${process.env.PUBLIC_URL}/Promo.jpg`}
              alt="About Cheerleading"
              style={{
                ...styleSheet.aboutCheerImg,
                ...responsive.aboutCheerImg,
              }}
            />

            {/* TEXT */}

            <div
              style={{
                ...styleSheet.infoText,
                ...responsive.infoText,
              }}
            >
              <p
                style={{
                  ...styleSheet.infoParagraph,
                  ...responsive.infoParagraph,
                }}
              >
                <strong>Cheerleading</strong> là một môn thể thao
                kết hợp giữa thể dục dụng cụ, nhảy múa và cổ vũ.
                Các thành viên trong đội thường thực hiện các
                động tác nhảy, xoay người, nâng đỡ và tạo hình
                để tạo ra những màn trình diễn ấn tượng và đầy
                năng lượng.

                <br />
                <br />

                Môn thể thao này không chỉ giúp cải thiện sức khỏe
                và thể lực mà còn phát triển khả năng phản xạ và
                làm việc nhóm.
              </p>

              {/* =================================================
                  INFINITE IMAGE SLIDER
              ================================================= */}

              <div
                style={{
                  ...styleSheet.sliderWrapper,
                  ...responsive.sliderWrapper,
                }}
              >
                <div
                  style={{
                    ...styleSheet.sliderTrack,
                  }}
                >
                  {[...images, ...images].map((item, index) => (
                    <img
                      key={index}
                      src={item.src}
                      alt={item.name}
                      style={{
                        ...styleSheet.sliderImage,
                        ...responsive.sliderImage,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            TEAM SECTION
        ===================================================== */}

        <div
          style={{
            ...styleSheet.Container,
            ...responsive.Container,
          }}
        >
          <h1
            style={{
              ...styleSheet.title,
              ...responsive.title,
            }}
          >
            Một Chút Về Đội Của Tụi Mình
          </h1>

          <div
            style={{
              ...styleSheet.teamContainer,
              ...responsive.teamContainer,
            }}
          >
            {/* =================================================
                LEFT SIDE
            ================================================= */}

            <div
              style={{
                ...styleSheet.teamLeft,
                ...responsive.teamLeft,
              }}
            >
              <div
                style={{
                  ...styleSheet.teamCard,
                  ...responsive.teamCard,
                }}
              >
                <p
                  style={{
                    ...styleSheet.teamDescription,
                    ...responsive.teamDescription,
                  }}
                >
                  Đội tụi mình được thành lập vào năm 2023,
                  trực thuộc trường Đại học Công Nghệ Kĩ Thuật
                  TP.HCM, cụ thể là Khoa Đào Tạo Tiên Tiến.

                  <br />
                  <br />

                  Với mục tiêu mang đến những màn trình diễn
                  ấn tượng và đầy năng lượng, chúng mình luôn
                  tìm kiếm những thành viên mới để cùng nhau
                  phát triển và tạo ra những trải nghiệm tuyệt vời.
                </p>

                {/* SCHOOL LOGOS */}

                <div
                  style={{
                    ...styleSheet.teamLogos,
                    ...responsive.teamLogos,
                  }}
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/LogoHCM-UTE.png`}
                    alt="HCM-UTE"
                    style={{
                      ...styleSheet.uteLogo,
                      ...responsive.uteLogo,
                    }}
                  />

                  <img
                    src={`${process.env.PUBLIC_URL}/LogoFAE.png`}
                    alt="FAE"
                    style={{
                      ...styleSheet.faeLogo,
                      ...responsive.faeLogo,
                    }}
                  />
                </div>
              </div>

              {/* QUOTE */}

              <p
                style={{
                  ...styleSheet.teamQuote,
                  ...responsive.teamQuote,
                }}
              >
                Hãy cùng nhau tạo ra những khoảnh khắc đáng nhớ
                và truyền cảm hứng cho mọi người thông qua
                Cheerleading!
              </p>
            </div>

            {/* =================================================
                RECORD RACK
            ================================================= */}

            <div
              style={{
                ...styleSheet.recordContainer,
                ...responsive.recordContainer,
              }}
            >
              {images.map((item, index) => {
                const isHovered = hoveredRecord === index;

                return (
                  <div
                    key={index}
                    onMouseEnter={() => setHoveredRecord(index)}
                    onMouseLeave={() => setHoveredRecord(null)}
                    style={{
                      ...styleSheet.recordItem,
                      ...responsive.recordItem,

                      ...(isHovered
                        ? styleSheet.recordItemHover
                        : {}),
                    }}
                  >
                    {/* IMAGE */}

                    <img
                      src={item.src}
                      alt={item.name}
                      style={{
                        ...styleSheet.recordImage,
                        ...responsive.recordImage,
                      }}
                    />

                    {/* NAME */}

                    <div
                      style={{
                        ...styleSheet.recordName,
                        ...responsive.recordName,

                        ...(isHovered
                          ? styleSheet.recordNameHover
                          : {}),
                      }}
                    >
                      {item.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   STYLE SHEET
============================================================= */

const styleSheet = {
  /* =========================================================
     ROOT
  ========================================================= */

  root: {
    width: "100%",
    minHeight: "100vh",
    overflowX: "hidden",
  },

  /* =========================================================
     GENERAL
  ========================================================= */

  title: {
    fontSize: "2rem",
    color: "#002B00",
    textAlign: "center",
    marginTop: "1rem",
    marginBottom: "1rem",
    fontWeight: "bold",
    paddingBottom: "1rem",
  },

  /* =========================================================
     HERO
  ========================================================= */

  heroContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    textAlign: "center",

    height: "calc(100vh - 70px)",
    minHeight: "600px",

    padding: "2rem",
    boxSizing: "border-box",
  },

  logoWrapper: {
    position: "relative",

    width: "20%",
    maxWidth: "300px",

    overflow: "hidden",
  },

  logo: {
    width: "100%",
    height: "auto",

    display: "block",
  },

  secondLogo: {
    position: "absolute",

    inset: 0,

    width: "100%",
    height: "100%",

    objectFit: "contain",

    display: "block",
  },

  heroText: {
    fontSize: "2rem",

    color: "#333",

    textAlign: "center",

    marginTop: "1rem",

    lineHeight: "1.4",
  },

  heroDescription: {
    fontSize: "1.5rem",

    color: "#666",

    textAlign: "center",

    marginTop: "0",

    padding: "0 1rem",

    lineHeight: "1.5",
  },

  /* =========================================================
     CHEERLEADING SECTION
  ========================================================= */

  alternateContainer: {
    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    justifyContent: "center",

    minHeight: "100vh",

    padding: "3rem 1rem",

    boxSizing: "border-box",

    backgroundColor: "#f0f0f0",
  },

  InfoContainer: {
    display: "flex",

    justifyContent: "center",

    alignItems: "center",

    width: "100%",

    maxWidth: "1400px",

    minHeight: "70vh",

    gap: "2rem",

    boxSizing: "border-box",
  },

  aboutCheerImg: {
    width: "45%",

    maxWidth: "600px",

    height: "auto",

    objectFit: "cover",

    borderRadius: "0.5rem",
  },

  infoText: {
    width: "50%",

    maxWidth: "800px",

    marginLeft: "2rem",
  },

  infoParagraph: {
    fontSize: "1.2rem",

    color: "#333",

    lineHeight: "1.6",

    paddingBottom: "2rem",
  },

  /* =========================================================
     INFINITE SLIDER
  ========================================================= */

  sliderWrapper: {
    display: "flex",

    overflow: "hidden",

    width: "100%",

    marginTop: "1rem",

    position: "relative",
  },

  sliderTrack: {
    display: "flex",

    width: "max-content",

    flexShrink: 0,

    animation: "slide 15s linear infinite",
  },

  sliderImage: {
    width: "30vw",

    maxWidth: "350px",

    height: "220px",

    objectFit: "cover",

    marginRight: "2rem",

    flexShrink: 0,

    borderRadius: "0.5rem",
  },

  /* =========================================================
     TEAM SECTION
  ========================================================= */

  Container: {
    display: "flex",

    flexDirection: "column",

    alignItems: "center",

    justifyContent: "center",

    minHeight: "100vh",

    padding: "3rem 1rem",

    boxSizing: "border-box",
  },

  teamContainer: {
    width: "90%",

    maxWidth: "1400px",

    minHeight: "70vh",

    display: "flex",

    flexDirection: "row",

    gap: "2rem",

    marginTop: "1rem",
  },

  teamLeft: {
    flex: 2,

    display: "flex",

    flexDirection: "column",

    padding: "0",
  },

  teamCard: {
    border: "1px solid #ccc",

    borderRadius: "0.5rem",

    padding: "2rem",

    width: "100%",

    minHeight: "350px",

    boxSizing: "border-box",

    display: "flex",

    flexDirection: "column",

    justifyContent: "center",

    alignItems: "center",
  },

  teamDescription: {
    fontSize: "1.2rem",

    color: "#333",

    lineHeight: "1.6",

    padding: "0 1rem",

    textAlign: "left",

    marginTop: "1rem",
  },

  teamLogos: {
    display: "flex",

    gap: "12px",

    marginTop: "1rem",

    justifyContent: "center",

    alignItems: "center",

    width: "100%",
  },

  uteLogo: {
    width: "30%",

    height: "auto",
  },

  faeLogo: {
    width: "25%",

    height: "auto",
  },

  teamQuote: {
    fontSize: "1.2rem",

    color: "#333",

    lineHeight: "1.6",

    padding: "1rem",

    textAlign: "center",

    marginTop: "1rem",

    border: "1px solid #ccc",

    borderRadius: "0.5rem",

    boxSizing: "border-box",
  },

  /* =========================================================
     RECORD RACK
  ========================================================= */

  recordContainer: {
    flex: 0.8,

    display: "flex",

    flexDirection: "column",

    gap: "1rem",

    width: "100%",

    border: "1px solid #ccc",

    borderRadius: "0.5rem",

    padding: "1rem",

    boxSizing: "border-box",

    minHeight: "500px",

    justifyContent: "center",
  },

  recordItem: {
    display: "flex",

    alignItems: "center",

    width: "100%",

    height: "120px",

    border: "2px solid transparent",

    borderRadius: "0.5rem",

    boxSizing: "border-box",

    transition: "all 0.3s ease",

    overflow: "hidden",

    cursor: "pointer",
  },

  recordItemHover: {
    border: "2px solid #002B00",

    boxShadow: "0 2px 8px rgba(0, 43, 0, 0.08)",
  },

  recordImage: {
    height: "100%",

    width: "120px",

    objectFit: "cover",

    borderRadius: "0.5rem",

    flexShrink: 0,
  },

  recordName: {
    opacity: 0,

    transform: "translateX(-20px)",

    marginLeft: "1rem",

    transition: "all 0.3s ease",

    fontSize: "1.2rem",

    fontWeight: "bold",

    color: "#002B00",
  },

  recordNameHover: {
    opacity: 1,

    transform: "translateX(0)",
  },

  /* =========================================================
     RESPONSIVE STYLES
  ========================================================= */

  responsive: (width) => {
    /* =======================================================
       MOBILE
       <= 600px
    ======================================================= */

    if (width <= 600) {
      return {
        title: {
          fontSize: "1.5rem",
        },

        heroContainer: {
          height: "auto",

          minHeight: "calc(100vh - 70px)",

          padding: "2rem 1rem",
        },

        logoWrapper: {
          width: "45%",
        },

        heroText: {
          fontSize: "1.4rem",

          lineHeight: "1.4",
        },

        heroDescription: {
          fontSize: "1rem",

          lineHeight: "1.5",
        },

        alternateContainer: {
          minHeight: "auto",

          padding: "3rem 1rem",
        },

        InfoContainer: {
          flexDirection: "column",

          height: "auto",

          minHeight: "auto",

          padding: "1rem 0",

          gap: "2rem",
        },

        aboutCheerImg: {
          width: "90%",

          maxWidth: "500px",
        },

        infoText: {
          width: "100%",

          maxWidth: "100%",

          marginLeft: 0,
        },

        infoParagraph: {
          fontSize: "1rem",

          lineHeight: "1.6",
        },

        sliderWrapper: {
          width: "100%",
        },

        sliderImage: {
          width: "70vw",

          maxWidth: "none",

          height: "200px",

          marginRight: "1rem",
        },

        Container: {
          minHeight: "auto",

          padding: "3rem 1rem",
        },

        teamContainer: {
          width: "95%",

          minHeight: "auto",

          flexDirection: "column",

          gap: "1rem",
        },

        teamLeft: {
          width: "100%",

          flex: "none",
        },

        teamCard: {
          minHeight: "300px",

          padding: "1rem",
        },

        teamDescription: {
          fontSize: "1rem",

          padding: "0 0.5rem",
        },

        teamLogos: {
          marginTop: "1rem",
        },

        uteLogo: {
          width: "35%",
        },

        faeLogo: {
          width: "30%",
        },

        teamQuote: {
          fontSize: "1rem",
        },

        recordContainer: {
          width: "100%",

          flex: "none",

          minHeight: "auto",

          padding: "0.5rem",
        },

        recordItem: {
          height: "80px",
        },

        recordImage: {
          width: "80px",
        },

        recordName: {
          fontSize: "1rem",

          marginLeft: "0.5rem",
        },
      };
    }

    /* =======================================================
       TABLET
       <= 900px
    ======================================================= */

    if (width <= 900) {
      return {
        heroContainer: {
          padding: "2rem 1rem",
        },

        logoWrapper: {
          width: "30%",
        },

        heroText: {
          fontSize: "1.7rem",
        },

        heroDescription: {
          fontSize: "1.2rem",
        },

        InfoContainer: {
          flexDirection: "column",

          height: "auto",

          minHeight: "auto",

          padding: "2rem 1rem",

          gap: "2rem",
        },

        aboutCheerImg: {
          width: "70%",

          maxHeight: "400px",

          objectFit: "cover",
        },

        infoText: {
          width: "90%",

          maxWidth: "800px",

          marginLeft: 0,
        },

        teamContainer: {
          width: "90%",

          height: "auto",

          minHeight: "auto",

          flexDirection: "column",
        },

        teamLeft: {
          width: "100%",

          flex: "none",
        },

        recordContainer: {
          width: "100%",

          flex: "none",

          height: "auto",

          minHeight: "auto",
        },

        recordItem: {
          height: "100px",
        },

        recordImage: {
          width: "100px",
        },
      };
    }

    /* =======================================================
       DESKTOP
       > 900px
    ======================================================= */

    return {
      title: {},

      heroContainer: {},

      logoWrapper: {},

      heroText: {},

      heroDescription: {},

      alternateContainer: {},

      InfoContainer: {},

      aboutCheerImg: {},

      infoText: {},

      infoParagraph: {},

      sliderWrapper: {},

      sliderImage: {},

      Container: {},

      teamContainer: {},

      teamLeft: {},

      teamCard: {},

      teamDescription: {},

      teamLogos: {},

      uteLogo: {},

      faeLogo: {},

      teamQuote: {},

      recordContainer: {},

      recordItem: {},

      recordImage: {},

      recordName: {},
    };
  },
};